import './sign-in-combined.scss';
import routes from '../../../navigation/routes';
import accountTypes from '../../../redux/workers/account/account-types';
import authTypes from '../../../redux/workers/auth/auth-types';
import Button from '../ui-component/button/button';
import Input from '../ui-component/input/input';
import Switch from '../ui-component/switch/switch';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object({
  emailFactor: yup.string().required('This field is required'),
  yubicoFactor: yup.string().required('This field is required'),
});

const SignInCombined = () => {
  const { handleSubmit, register, formState } = useForm({ resolver: yupResolver(schema) });
  const { errors } = formState;
  const errorMessage = useSelector((state) => state.authReducer.signIn.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.email) {
      navigate(routes.home);
    }
  }, [location.state?.email, navigate]);

  const handleSignIn = (data) => {
    dispatch({
      type: authTypes.MULTI_FACTOR_AUTH, payload: { ...data }, navigate,
    });
  };

  const handleResend = () => {
    dispatch({ type: accountTypes.SEND_VERIFICATION_EMAIL_CODE });
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="sign-in-yubi-email">
      <div className="sign-in-yubi-email__email-container">
        <p className="confirmation__subtitle">A code was sent to the specified one</p>
        <p className="confirmation__email">{location.state?.email}</p>
        <Input
          {...register('emailFactor')}
          description={errors.emailFactor?.message}
          isInvalid={!!errors?.emailFactor}
          containerClass="confirmation__input"
          placeholder="Enter the code"
          type="text"
          label="Enter the code from the email"
        />
        <p className="sign-in-yubi-email__resend-text">
          Didn&apos;t get the code?
          {' '}
          <button
            onClick={handleResend}
            type="button"
            className="sign-in-yubi-email__resend-button"
          >
            Resend code
          </button>
        </p>
      </div>
      <div className="sign-in-yubi-email__yubi-container">
        <p className="yubi-key-form__subtitle">Please use your YubiKey</p>
        <ol className="yubi-key__list">
          <li className="yubi-key-form__list-item">
            <p className="yubi-key-form__list-item-text">Insert your YubiKey in the USB-port with the USB-contact facing upward</p>
          </li>
          <li className="yubi-key-form__list-item">
            <p className="yubi-key-form__list-item-text">Wait until your YubiKey touch-button shines with a steady light</p>
          </li>
          <li className="yubi-key-form__list-item">
            <p className="yubi-key-form__list-item-text">Hold your fingertip on the touch-button for 1 second</p>
          </li>
        </ol>
        <Input
          {...register('yubicoFactor')}
          description={errors?.yubicoFactor?.message}
          isInvalid={!!errors?.yubicoFactor}
          placeholder="Passcode"
          type="text"
          containerClass="yubi-key-form__passcode--combined"
        />
        <div className="yubi-key-form__controls">
          <span className="yubi-key-form__switch-container">
            <Switch onChange={(isChecked) => isChecked} addClass="yubi-key-form__switch" />
            <p className="yubi-key-form__switch-label">Trust this computer for 30 days</p>
          </span>
          <a className="yubi-key-form__link" href="/">I&apos;ve lost my Yubikey device</a>
        </div>
      </div>
      {errorMessage && <p className="sign-in-yubi-email__error-message">{errorMessage}</p>}
      <Button type="submit" title="Authenticate" addClass="yubi-key-form__submit" />
    </form>
  );
};

export default SignInCombined;
