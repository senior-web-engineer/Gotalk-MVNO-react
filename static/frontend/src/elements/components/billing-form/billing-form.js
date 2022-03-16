import './billing-form.scss';
import routes from '../../../navigation/routes';
import actionsType from '../../../redux/workers/main-page/actions-type';
import paymentTypes from '../../../redux/workers/payment/payment-types';
import { getBasketItems } from '../../../shared/basketActions';
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

const BillingForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const plans = useSelector((state) => state.mainReducer.plans);
  const { isSignedIn, user } = useSelector((state) => state.authReducer);
  const { errors } = useSelector((state) => state.payment);
  const { hasDelivery } = useSelector((state) => state.basketReducer);
  const [isDeliveryAuto, setDeliveryAuto] = useState(false);
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
    if (!hasDelivery && isSignedIn) {
      navigate(routes.bag);
    }
  }, [hasDelivery, isSignedIn, navigate]);

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

  const handleUserInfo = async (data) => {
    const products = getBasketItems();
    const userInfoData = {
      products,
    };

    if (location.state?.hasDelivery) {
      userInfoData.delivery = data.delivery;
    }

    if (!isSignedIn) {
      userInfoData.user = data.user;
      delete userInfoData.user.passwordConfirmation;
    }

    if (isDeliveryAuto) {
      Object.keys(data.delivery).forEach((key) => {
        userInfoData.delivery[key] = userInfoData.user[key];
      });
    }

    if (isSignedIn) {
      dispatch({
        type: paymentTypes.BUY_PLAN_AUTHORIZED,
        payload: userInfoData,
        navigate,
        user,
      });
    } else {
      dispatch({
        type: paymentTypes.BUY_PLAN,
        payload: userInfoData,
        navigate,
        user: userInfoData.user,
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
            <div className="billing-form__form-container user">
              <div className="billing-form__form-header-container">
                <h3 className="billing-form__form-header">Billing details</h3>
              </div>
              <div className="billing-form__form-content">
                <UserInfoForm parentName="user" isBillingUserInfo />
                {hasDelivery
                  && (
                    <Checkbox
                      onChange={(event) => handleSwitch(event)}
                      addClass="billing-form__ship-to-address"
                      label="Ship to billing address"
                    />
                  )}
              </div>
            </div>
            )}
            {hasDelivery
              && (
                <div className={deliveryContentClasses}>
                  <div className="billing-form__form-header-container">
                    <h3 className="billing-form__form-header">Shipping details</h3>
                  </div>
                  <DeliveryInfoForm
                    parentName="delivery"
                    addressData={isDeliveryAuto ? billingAddress : null}
                    wide={isSignedIn}
                  />
                </div>
              )}
          </div>
          <SimsOutErrors errors={errors} plans={plans} />
          <button
            className="billing-form__submit"
            type="submit"
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
