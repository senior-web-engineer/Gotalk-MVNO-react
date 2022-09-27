import './payment-form.scss';
import routes from '../../../navigation/routes';
import { PAYMENT_STATUSES } from '../../../redux/reducers/payment';
import paymentTypes from '../../../redux/workers/payment/payment-types';
import { formatHolder } from '../../../shared/cardFormatter';
import PaymentPopup from '../basket/payment-popup/payment-popup';
import Checkbox from '../ui-component/checkbox/checkbox';
import Input from '../ui-component/input/input';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import get from 'lodash/get';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import StripeTrustBadge from "../../../assets/images/payment/stripe-trust-badge.png";
import authTypes from "../../../redux/workers/auth/auth-types";
import {setCouponToLocalStorage} from "../../../shared/basketActions";
import actionsTypes from "../../../redux/workers/account/account-types";

const PaymentForm = ({checkout, isBasketEmpty}) => {
  const [showPopup, setShowPopup] = useState(false);
  const holderRef = useRef(null);
  const sendReceipt = useRef(false);
  const { totalPrice, paymentStatus, coupon } = useSelector((state) => ({
    totalPrice: state.basketReducer.totalPrice,
    paymentStatus: state.payment.paymentStatus,
    coupon: state.basketReducer.coupon
  }));
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontFamily: 'Roboto-Regular, sans-serif',
          fontStyle: 'normal',
          fontSize: '18px',
        },
      },
    }),
    [],
  );
  const {checkoutDatas} =  useSelector(state => state.payment);
  const {isSignedIn, user} = useSelector(state => state.authReducer);

  const handleSubmit = () => {
    if (!holderRef.current?.value) {
      return;
    }

    if (holderRef.current.value.length < 4) {
      holderRef.current.classList.add('invalid');
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const paymentConfig = {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: holderRef.current.value,
        },
      },
    };

    if (sendReceipt.current) {
      paymentConfig.receipt_email = checkout
          ? checkoutDatas.user.email
          : location.state?.user?.email;
    }

    let clientSecret, payId, email;
    if(checkout) {
      clientSecret = checkoutDatas.clientSecret;
      payId = checkoutDatas.payId;
      email = checkoutDatas.user.email;
    }
    else {
      clientSecret = get(location, 'state.clientSecret', '');
      payId = get(location, 'state.payId', '');
      email = get(location, 'state.user.email', '');
    }

    dispatch({
      type: paymentTypes.BUY_PLAN_STRIPE,
      stripe,
      clientSecret,
      paymentConfig,
      payId,
      email,
    });
  };

  const handleClosePopup = () => {
    switch (paymentStatus.status) {
      case PAYMENT_STATUSES.ERROR_STRIPE:
        setShowPopup(false);
        break;

      case PAYMENT_STATUSES.ERROR_SIM_CARD:
        navigate(routes.plans);
        break;

      case PAYMENT_STATUSES.SUCCESS:
        setCouponToLocalStorage(null);
        if(!isSignedIn) {
          dispatch({
            type: authTypes.SIGN_IN,
            payload: {
              userData: {
                email: checkoutDatas.user.email,
                password: checkoutDatas.user.password
              },
              userSimPlanId: checkoutDatas.userSimPlanId,
              simType: checkoutDatas.simType,
              redirect: navigate
            }
          });
        } else {
          dispatch({ type: actionsTypes.LOAD_CURRENT_PRODUCT, id: checkoutDatas.userSimPlanId });
          navigate(`${routes.account.base}/${routes.account.tracker}/${checkoutDatas.simType}?id=${checkoutDatas.userSimPlanId}`);
        }
        break;

      default:
        setShowPopup(false);
    }
  };

  const handleCheck = (event) => {
    const { checked } = event.target;
    sendReceipt.current = checked;
  };

  const resetPaymentStatus = () => dispatch({
    type: paymentTypes.SET_PAYMENT_STATUS,
    paymentStatus: { status: PAYMENT_STATUSES.DISABLE, message: '' },
  });

  useEffect(() => {
    switch (paymentStatus.status) {
      case PAYMENT_STATUSES.DISABLE:
        return;

      case PAYMENT_STATUSES.SUCCESS:
        setShowPopup(true);
        addShareASaleScripts();
        addGoogleSaleScripts();
        break;

      case PAYMENT_STATUSES.ERROR_SIM_CARD:
        setShowPopup(true);
        break;

      case PAYMENT_STATUSES.ERROR_STRIPE:
        setShowPopup(true);
        break;

      default:
        break;
    }
  }, [paymentStatus]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => resetPaymentStatus, []);

  useEffect(() => {
    removeShareASaleScripts();
    removeGoogleSaleScripts();
  }, []);

  function addShareASaleScripts() {
    const img = document.createElement("img");
    img.src = `https://www.shareasale.com/sale.cfm?tracking=${getPayId()}&amount=${totalPrice - (discountAmount || 0)}&merchantID=127982&transtype=sale`;
    img.width = "1";
    img.height = "1";
    img.id = "shareasaleImg";
    document.getElementsByTagName("body")[0].appendChild(img);

    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://www.dwin1.com/19038.js";
    s.id = "shareasale";
    document.getElementsByTagName("head")[0].appendChild(s);
  }

  function removeShareASaleScripts() {
    document.getElementById("shareasale")?.remove();
    document.getElementById("shareasaleImg")?.remove();
  }

  function addGoogleSaleScripts() {
    const s = document.createElement("script");
    s.id = "googlesale";
    s.innerHTML = `gtag('event', 'conversion', { 'send_to': 'AW-10903290545/Y7XzCODKocMDELGFjM8o', 'transaction_id': '${getPayId()}' });`;
    document.getElementsByTagName("head")[0].appendChild(s);
  }

  function removeGoogleSaleScripts() {
    document.getElementById("googlesale")?.remove();
  }

  const discountAmount = useMemo(() => {
    if(!coupon) {
      return 0;
    }

    if(coupon.discountType === 'PERCENTAGE') {
      return totalPrice / (100 / coupon.discountPercentage);
    }

    return coupon.discountAmount;
  }, [coupon, totalPrice]);

  function checkoutSubmitForms() {
    if(!checkoutDatas) {
      document.querySelector('.billing-form__submit')?.click();
    }
    else {
      handleSubmit();
    }
  }

  useEffect(() => {
    if(checkoutDatas) {
      handleSubmit();
    }
  }, [checkoutDatas]);

  function getPayId() {
    return checkoutDatas?.payId || get(location, 'state.payId', '');
  }

  return (
    <form onSubmit={handleSubmit} className="payment__form">
      {!isBasketEmpty ? (
          <div className="payment-form">
            {!checkout && (
                <>
                  <div className="payment-form__header-container">
                    <h3 className="payment-form__header">Payment</h3>
                  </div>
                  <span className="payment-form__total-price-container">
                    <strong className="payment-form__total-price-text">Total</strong>
                    <strong className="payment-form__total-price-price">{`$${totalPrice - (discountAmount || 0)}`}</strong>
                  </span>
                </>
            )}
            {totalPrice === 0 && (
                <div className="payment-form__trial">
                  Please enter your card details below to allow us to validate you are a real person.
                  You will not be charged during the trial period.
                </div>
            )}
            <div className="payment-form__card-container">
              <div className="payment-form__card-side front">
                <div className="payment-form__field-container">
                  <p className="payment-form__field-label">Credit card number</p>
                  <CardNumberElement options={{ ...options, placeholder: '0000 0000 0000 0000' }} />
                </div>
                <div className="payment-form__row">
                  <div className="payment-form__field-container holder">
                    <p className="payment-form__field-label">Card Holder name</p>
                    <Input
                        ref={holderRef}
                        onFocus={() => holderRef.current.classList.remove('invalid')}
                        onChange={(event) => {
                          const input = event.target;
                          input.value = formatHolder(input.value);
                          return event;
                        }}
                        containerClass="payment-form__input"
                        placeholder="Enter credit holder name"
                        type="text"
                        autoComplete="name"
                    />
                  </div>
                  <div className="payment-form__field-container">
                    <p className="payment-form__field-label">Expiration Date</p>
                    <CardExpiryElement options={options} />
                  </div>
                </div>
              </div>
              <div className="payment-form__card-side back">
                <div className="payment-form__cvv-background" />
                <div className="payment-form__field-container cvv">
                  <p className="payment-form__field-label">CVC</p>
                  <CardCvcElement options={{ ...options }} />
                </div>
              </div>
              <div className="payment-form__card__trustbadge">
                <img src={StripeTrustBadge} alt="Stripe Secure Payment" className="payment-form__card__trustbadge-img"/>
              </div>
            </div>
            <div className="payment-form__row">
              <Checkbox
                  onChange={handleCheck}
                  label="Get a receipt by email"
                  addClass="payment-form__checkbox"
              />
              <span className="payment-form__total-price-container">
                <strong className="payment-form__total-price-text">Total</strong>
                <strong className="payment-form__total-price-price">{`$${totalPrice - (discountAmount || 0)}`}</strong>
              </span>
            </div>
            <div className="payment-form__controls-container">
              {checkout ? (
                  <button type="button" className="payment-form__button-pay" onClick={checkoutSubmitForms}>
                    PAY
                  </button>
              ) : (
                  <button type="submit" className="payment-form__button-pay">
                    PAY
                  </button>
              )}
            </div>
            <div className="payment-form__policy">
              By placing your order, you agree to our <a href="/terms-conditions" target="_blank">Terms & Conditions</a>, <a href="/return-policy" target="_blank">Refund Policy</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>
            </div>
          </div>
      ) : null}
      {showPopup && (
        <PaymentPopup
          isSuccess={paymentStatus.status === PAYMENT_STATUSES.SUCCESS}
          close={handleClosePopup}
          onSubmit={handleClosePopup}
          message={paymentStatus.message}
        />
      )}
    </form>
  );
};

export default PaymentForm;
