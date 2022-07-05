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
import {getCouponFromLocalStorage} from "../../../shared/basketActions";
import StripeTrustBadge from "../../../assets/images/payment/stripe-trust-badge.png";

const PaymentForm = ({checkout, isBasketEmpty}) => {
  const [showPopup, setShowPopup] = useState(false);
  const holderRef = useRef(null);
  const sendReceipt = useRef(false);
  const { totalPrice, paymentStatus } = useSelector((state) => ({
    totalPrice: state.basketReducer.totalPrice,
    paymentStatus: state.payment.paymentStatus,
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
  const [coupon, setCoupon] = useState();
  const {checkoutDatas} =  useSelector(state => state.payment);

  useEffect(() => {
    setCoupon(getCouponFromLocalStorage());
  }, []);

  const handleSubmit = () => {
    if (!holderRef.current.value) {
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
      paymentConfig.receipt_email = location.state?.user?.email;
    }

    let clientSecret, payId, email;
    if(checkout) {
      clientSecret = checkoutDatas.clientSecret;
      payId = checkoutDatas.payId;
      email = checkoutDatas.email;
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
        navigate(routes.plans);
        break;

      default:
        setShowPopup(false);
    }
  };

  const handleSubmitPopup = () => {
    switch (paymentStatus.status) {
      case PAYMENT_STATUSES.ERROR_STRIPE:
        setShowPopup(false);
        break;

      case PAYMENT_STATUSES.ERROR_SIM_CARD:
        navigate(routes.plans);
        break;

      case PAYMENT_STATUSES.SUCCESS:
        navigate(routes.plans);
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

  const discountAmount = useMemo(() => {
    if(!coupon) {
      return 0;
    }

    if(coupon.discountType === 'PERCENTAGE') {
      return totalPrice / (100 / coupon.discountPercentage);
    }

    return coupon.discountAmount;
  }, [coupon]);

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
              <button
                  type="button"
                  className="payment-form__button-back"
                  onClick={() => navigate(routes.billingDetails)}
              >
                BACK
              </button>
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
          </div>
      ) : null}
      {showPopup && (
        <PaymentPopup
          isSuccess={paymentStatus.status === PAYMENT_STATUSES.SUCCESS}
          close={handleClosePopup}
          onSubmit={handleSubmitPopup}
          message={paymentStatus.message}
        />
      )}
      {(showPopup && paymentStatus.status === PAYMENT_STATUSES.SUCCESS) && (
          <img src={`https://www.shareasale.com/sale.cfm?tracking=${getPayId()}&amount=${totalPrice - (discountAmount || 0)}&merchantID=127982&transtype=sale`} width="1" height="1" />
      )}
    </form>
  );
};

export default PaymentForm;
