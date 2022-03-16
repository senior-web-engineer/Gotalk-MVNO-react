import './restore-password-form.scss';
import routes from '../../../navigation/routes';
import authTypes from '../../../redux/workers/auth/auth-types';
import Input from '../ui-component/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('This is not an email').required('This field is required'),
});

const RestorePasswordForm = () => {
  const { handleSubmit, register, formState } = useForm({ resolver: yupResolver(schema) });
  const { errors } = formState;
  const errorMessage = useSelector((state) => state.authReducer.restorePassword.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: authTypes.RESET_ERRORS });
  }, [dispatch]);

  const sendEmail = (data) => {
    const { email } = data;
    dispatch({
      type: authTypes.RESTORE_PASSWORD, payload: { email, navigate },
    });
  };

  const handleClick = () => {
    navigate(routes.signIn.base);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <form onSubmit={handleSubmit(sendEmail)} className="restore-password-form">
      <h1 className="restore-password-form__header">Forgot password</h1>
      <p className="restore-password-form__title">Don’t worry! Just fill in your email and we’ll send you a reset</p>
      <Input
        {...register('email')}
        containerClass="restore-password-form__email-input"
        description={errors.email?.message}
        isInvalid={!!errors.email}
        label="E-mail address"
        placeholder="Enter e-mail"
      />
      {errorMessage && <p className="restore-password-form__error-message">{errorMessage}</p>}
      <div className="restore-password-form__controls">
        <button
          onClick={handleClick}
          className="restore-password-form__back-button"
          type="button"
        >
          BACK
        </button>
        <button className="restore-password-form__send-button" type="submit">SEND</button>
      </div>
    </form>
  );
};

export default RestorePasswordForm;
