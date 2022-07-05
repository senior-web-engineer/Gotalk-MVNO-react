import './billing-form.scss';
import routes from '../../../navigation/routes';
import actionsType from '../../../redux/workers/main-page/actions-type';
import paymentTypes from '../../../redux/workers/payment/payment-types';
import {getBasketItems, getCouponFromLocalStorage} from '../../../shared/basketActions';
import { billingUserSchema, deliverySchema, emptySchema } from '../../../shared/schemas/validation-rules';
import DeliveryInfoForm from '../delivery-info-form/delivery-info-form';
import Checkbox from '../ui-component/checkbox/checkbox';
import SimsOutErrors from '../ui-component/sims-out-errors/sims-out-errors';
import UserInfoForm from '../user-info-form/user-info-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const BillingForm = ({ onSubmit, checkout, isBasketEmpty }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const plans = useSelector((state) => state.mainReducer.plans);
  const { isSignedIn, user } = useSelector((state) => state.authReducer);
  const { errors } = useSelector((state) => state.payment);
  const { hasDelivery } = useSelector((state) => state.basketReducer);
  const [isDeliveryAuto, setDeliveryAuto] = useState(true);
  const [billingAddress, setBillingAddress] = useState();

  const deliveryContentClasses = classNames(
    'billing-form__form-container',
    'delivery',
    { 'billing-form__form-container--wide': isSignedIn },
  );

  const schema = yup.object().shape({
    user: isSignedIn ? emptySchema() : billingUserSchema(),
    delivery: isDeliveryAuto
    || !hasDelivery
      ? emptySchema()
      : deliverySchema(),
  }).required();

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!hasDelivery && isSignedIn && !checkout) {
      navigate(routes.bag);
    }
  }, [hasDelivery, isSignedIn, navigate, checkout]);

  useEffect(() => {
    dispatch({ type: paymentTypes.RESET_PAYMENT_ERRORS });
  }, [dispatch]);

  useEffect(() => {
    let sub;
    if (isDeliveryAuto) {
      sub = methods.watch((value) => {
        setBillingAddress({ ...value.user });
      });
    }

    return () => {
      if (sub) {
        sub.unsubscribe();
      }
    };
  }, [isDeliveryAuto, methods]);

  useEffect(() => {
    if (!plans.length) {
      dispatch({ type: actionsType.LOAD_PLANS });
    }
  }, [dispatch, plans]);

  useEffect(() => {
    if(isSignedIn) {
      setDeliveryAuto(false);
    }
  }, [isSignedIn]);

  const handleUserInfo = async (data) => {
    const products = getBasketItems();
    const userInfoData = {
      products,
      coupon: getCouponFromLocalStorage()
    };

    if(!data.delivery) {
      data.delivery = {
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        apartment: '',
        country: '',
        zip: ''
      }
    }

    if (hasDelivery) {
      userInfoData.delivery = data.delivery;
    }

    if (!isSignedIn) {
      userInfoData.user = data.user;
      delete userInfoData.user.passwordConfirmation;
    }

    if (isDeliveryAuto && hasDelivery) {
      if(isSignedIn) {
        Object.keys(data.delivery).forEach((key) => {
          userInfoData.delivery[key] = user[key];
        });
      }
      else {
        Object.keys(data.delivery).forEach((key) => {
          userInfoData.delivery[key] = userInfoData.user[key];
        });
      }
    }

    if (isSignedIn) {
      dispatch({
        type: paymentTypes.BUY_PLAN_AUTHORIZED,
        payload: userInfoData,
        navigate,
        user,
        checkout: !!checkout
      });
    } else {
      dispatch({
        type: paymentTypes.BUY_PLAN,
        payload: userInfoData,
        navigate,
        user: userInfoData.user,
        checkout: !!checkout
      });
    }

    if (onSubmit) {
      onSubmit(userInfoData);
    }
  };

  const handleSwitch = (event) => {
    const { checked } = event.target;

    if (checked) {
      methods.clearErrors('delivery');
      setDeliveryAuto(true);
      setBillingAddress(methods.getValues('user'));
    } else {
      setDeliveryAuto(false);
    }
  };

  if(isBasketEmpty) {
    return null;
  }

  return (
    <div className="billing-form">
      <FormProvider {...methods}>
        <form
          autoComplete="on"
          className="billing-form__form"
          onSubmit={methods.handleSubmit(handleUserInfo)}
        >
          <div className="billing-form__row">
            {!isSignedIn
            && (
            <>
              <div className="billing-form__form-container user">
                <div className="billing-form__form-header-container">
                  <h3 className="billing-form__form-header">Create Account</h3>
                </div>
                <div className="billing-form__form-content">
                  <UserInfoForm parentName="user" isBillingUserInfo onlyCreateAccount={true} />
                </div>
              </div>
              <div className="billing-form__form-container user">
                <div className="billing-form__form-header-container">
                  <h3 className="billing-form__form-header">Billing Address</h3>
                </div>
                <div className="billing-form__form-content">
                  <UserInfoForm parentName="user" isBillingUserInfo />
                  {hasDelivery
                      && (
                          <Checkbox
                              onChange={(event) => handleSwitch(event)}
                              addClass="billing-form__ship-to-address"
                              label="Ship to billing address"
                              checked={isDeliveryAuto}
                          />
                      )}
                </div>
              </div>
            </>
            )}
            {(hasDelivery && isSignedIn || hasDelivery && !isDeliveryAuto) && (
                <div className={deliveryContentClasses}>
                  <div className="billing-form__form-header-container">
                    <h3 className="billing-form__form-header">Shipping Address</h3>
                  </div>
                  <DeliveryInfoForm
                    parentName="delivery"
                    addressData={(isDeliveryAuto && !isSignedIn) ? billingAddress : null}
                    wide={isSignedIn}
                  />
                </div>
              )}
          </div>
          <SimsOutErrors errors={errors} plans={plans} />
          <button
              className="billing-form__submit"
              type="submit"
              style={{display: checkout ? "none" : "block"}}
          >
            NEXT STEP
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

BillingForm.defaultProps = {
  onSubmit: () => {},
};

BillingForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default BillingForm;
