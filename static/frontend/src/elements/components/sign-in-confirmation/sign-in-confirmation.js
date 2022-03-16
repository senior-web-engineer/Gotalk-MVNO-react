import './sign-in-confirmation.scss';
import routes from '../../../navigation/routes';
import accountTypes from '../../../redux/workers/account/account-types';
import authTypes from '../../../redux/workers/auth/auth-types';
import Button from '../ui-component/button/button';
import Input from '../ui-component/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object({
  emailFactor: yup.string().required('This field is required'),
});

const SignInConfirmation = ({
  onBack, containerClass,
}) => {
  const errorMessage = useSelector((state) => state.authReducer.signIn.error);
  const { handleSubmit, formState, register } = useForm({ resolver: yupResolver(schema) });
  const { errors } = formState;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.email) {
      navigate(routes.home);
    }
  }, [location.state?.email, navigate]);

  const handleClick = () => {
    navigate(routes.signIn.base);
    onBack();
  };

  const onSignIn = (data) => {
    dispatch({
      type: authTypes.MULTI_FACTOR_AUTH, payload: { ...data }, navigate,
    });
  };

  const handleResend = () => {
    dispatch({ type: accountTypes.SEND_VERIFICATION_EMAIL_CODE });
  };

  return (
    <form onSubmit={handleSubmit(onSignIn)} className={`confirmation ${containerClass}`}>
      <p className="confirmation__subtitle">A code was sent to the specified one</p>
      <p className="confirmation__email">{location.state?.email}</p>
      <Input
        {...register('emailFactor')}
        description={errors.emailFactor?.message}
        isInvalid={!!errors.emailFactor}
        containerClass="confirmation__input"
        placeholder="Enter the code"
        type="text"
        label="Enter the code from the email"
      />
      <p className="confirmation__resend-text">
        Didn&apos;t get the code?
        {' '}
        <button
          onClick={handleResend}
          type="button"
          className="confirmation__resend-button"
        >
          Resend code
        </button>
      </p>
      {errorMessage
        && (
        <p className="confirmation__error-message">
          {errorMessage === 'Unauthorized' ? 'Wrong code' : errorMessage}
        </p>
        )}
      <div className="confirmation__buttons-container">
        <Button onClick={handleClick} title="BACK" addClass="confirmation__back-button" />
        <Button type="submit" title="SIGN IN" addClass="confirmation__sign-in-button" />
      </div>
    </form>
  );
};

SignInConfirmation.defaultProps = {
  onBack: () => {},
  containerClass: '',
};

SignInConfirmation.propTypes = {
  onBack: PropTypes.func,
  containerClass: PropTypes.string,
};

export default SignInConfirmation;
