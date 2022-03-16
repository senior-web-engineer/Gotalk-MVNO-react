import accountTypes from '../../../../../redux/workers/account/account-types';
import { userEditPasswordSchema } from '../../../../../shared/schemas/validation-rules';
import Button from '../../../ui-component/button/button';
import Input from '../../../ui-component/input/input';
import AccountEditSection from '../section/section';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import './change-password.scss';

const defaultValues = { password: '', newPassword: '', newPasswordConfirm: '' };

const AccountEditChangePassword = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(userEditPasswordSchema()),
  });

  const handleChangePassword = () => {
    handleSubmit((data) => {
      dispatch({
        type: accountTypes.POST_ACCOUNT_PASSWORD,
        body: data,
      });
    })();
  };

  return (
    <AccountEditSection title="Change password">
      <div className="account-screen-form__wrapper account-screen-form-passwords__wrapper">
        <Input
          {...register('password')}
          type="password"
          placeholder="Enter current Password"
          label="Current Password"
          containerClass="account-screen-edit__input account-screen-password__input"
          description={errors.password?.message}
          isInvalid={!!errors.password}
        />
        <Input
          {...register('newPassword')}
          type="password"
          placeholder="Enter new password"
          label="New Password"
          containerClass="account-screen-edit__input account-screen-password__input"
          description={errors.newPassword?.message}
          isInvalid={!!errors.newPassword}
        />
        <Input
          {...register('newPasswordConfirm')}
          type="password"
          placeholder="Enter confirm password"
          label="Confirm Password"
          containerClass="account-screen-edit__input account-screen-password__input"
          description={errors.newPasswordConfirm?.message}
          isInvalid={!!errors.newPasswordConfirm}
        />

        <Button
          addClass="account-screen-password__btn"
          title="Change password"
          onClick={handleChangePassword}
        />
      </div>
    </AccountEditSection>
  );
};

export default AccountEditChangePassword;
