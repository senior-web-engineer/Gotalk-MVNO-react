import './reset-password-form.scss';
import authTypes from '../../../redux/workers/auth/auth-types';
import Input from '../ui-component/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object({
  password: yup
    .string()
    .min(8, 'Must contain at least 8 characters')
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Must contain one uppercase, one lowercase, one number and one special case character',
    )
    .required('This field is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const ResetPasswordForm = () => {
  const { handleSubmit, register, formState } = useForm({ resolver: yupResolver(schema) });
  const { errors } = formState;
  const location = useLocation();
  const dispatch = useDispatch();
  const token = new URLSearchParams(location.search).get('token');
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleReset = (data) => {
    const userData = {
      password: data.password,
      passwordConfirm: data.passwordConfirmation,
      token,
    };

    dispatch({ type: authTypes.SET_NEW_PASSWORD, payload: { ...userData, navigate } });
  };

  return (
    <div className="reset-password-form">
      <h1 className="reset-password-form__header">Reset password</h1>
      <p className="reset-password-form__subtitle">Set the new password for your account</p>
      <form onSubmit={handleSubmit(handleReset)} className="reset-password-form__form">
        <div className="reset-password-form__inputs-container">
          <Input
            {...register('password')}
            description={errors.password?.message}
            isInvalid={!!errors.password}
            label="New password"
            placeholder="Enter password"
            type="password"
            containerClass="reset-password-form__input"
          />
          <Input
            {...register('passwordConfirmation')}
            description={errors.passwordConfirmation?.message}
            isInvalid={!!errors.passwordConfirmation}
            label="Confirm password"
            placeholder="Confirm password"
            type="password"
            containerClass="reset-password-form__input"
          />
        </div>
        <button className="reset-password-form__submit" type="submit">Reset password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
