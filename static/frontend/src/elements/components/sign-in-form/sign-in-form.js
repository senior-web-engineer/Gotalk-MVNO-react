/* eslint-disable max-len */
import './sign-in-form.scss';
import routes from '../../../navigation/routes';
import authTypes from '../../../redux/workers/auth/auth-types';
import Button from '../ui-component/button/button';
import Input from '../ui-component/input/input';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import validator from 'validator/es';

const SignInForm = () => {
  const { control, handleSubmit } = useForm();
  const errorMessage = useSelector((state) => state.authReducer.signIn.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: authTypes.RESET_ERRORS });
  }, [dispatch]);

  const onSignIn = (formData) => {
    dispatch({ type: authTypes.SIGN_IN, payload: { userData: formData, redirect: navigate } });
  };

  return (
    <>
      <span className="sign-in-form__sign-up-suggestion">
        <p className="sign-in-form__sign-up-text">
          Not a member?
          <NavLink to={routes.signUp} className="sign-in-form__sign-up-link"> Sign up now</NavLink>
        </p>
      </span>
      <form className="sign-in-form" onSubmit={handleSubmit(onSignIn)} autoComplete="on">
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
            validate: (value) => validator.isEmail(value) || 'This is not an email',
          }}
          render={({
            field: { onChange },
            fieldState: { error, invalid },
          }) => (
            <Input
              onChange={onChange}
              isInvalid={invalid}
              description={error?.message}
              containerClass="sign-in-form__email"
              label="E-mail address"
              placeholder="Enter e-mail"
              type="email"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({
            field: { onChange },
            fieldState: { error, invalid },
          }) => (
            <Input
              onChange={onChange}
              isInvalid={invalid}
              description={error?.message}
              containerClass="sign-in-form__password"
              label="Password"
              placeholder="Enter password"
              type="password"
            />
          )}
        />
        {errorMessage && <p className="sign-in-form__error-message">{errorMessage}</p>}
        <div className="sign-in-form__controls">
          <NavLink to={routes.restorePassword.base} className="sign-in-form__restore-password">Forgot your password?</NavLink>
          <Button type="submit" title="SIGN IN" addClass="sign-in-form__submit" />
        </div>
      </form>
    </>
  );
};

export default SignInForm;
