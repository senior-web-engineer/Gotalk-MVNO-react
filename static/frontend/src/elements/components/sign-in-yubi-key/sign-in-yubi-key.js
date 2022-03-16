import './sign-in-yubi-key.scss';
import routes from '../../../navigation/routes';
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
  yubicoFactor: yup.string().required('This field is required'),
});

const SignInYubiKey = () => {
  const errorMessage = useSelector((state) => state.authReducer.signIn.error);
  const { handleSubmit, register, formState } = useForm({ resolver: yupResolver(schema) });
  const { errors } = formState;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location.state?.email) {
      navigate(routes.home);
    }
  }, [location.state?.email, navigate]);

  const onSignIn = (data) => {
    dispatch({
      type: authTypes.MULTI_FACTOR_AUTH, payload: { ...data }, navigate,
    });
  };

  const handleChange = (isChecked) => isChecked;

  return (
    <form onSubmit={handleSubmit(onSignIn)} className="yubi-key-form">
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
      <div className="yubi-key-form__controls">
        <Input
          {...register('yubicoFactor')}
          description={errors.yubicoFactor?.message}
          isInvalid={!!errors.yubicoFactor}
          placeholder="Passcode"
          type="text"
          containerClass="yubi-key-form__passcode"
        />
        {errorMessage && (
        <p className="yubi-key-form__error-message">
          {errorMessage === 'Unauthorized' ? 'Wrong code' : errorMessage}
        </p>
        )}
        <Button type="submit" title="Authenticate" addClass="yubi-key-form__submit" />
      </div>
      <div className="yubi-key-form__controls">
        <span className="yubi-key-form__switch-container">
          <Switch onChange={handleChange} addClass="yubi-key-form__switch" />
          <p className="yubi-key-form__switch-label">Trust this computer for 30 days</p>
        </span>
        <a className="yubi-key-form__link" href="/">I&apos;ve lost my Yubikey device</a>
      </div>
    </form>
  );
};

export default SignInYubiKey;
