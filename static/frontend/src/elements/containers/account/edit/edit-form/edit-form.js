import accountTypes from '../../../../../redux/workers/account/account-types';
import { userEditSchema } from '../../../../../shared/schemas/validation-rules';
import AccountEditChangePassword from '../../../../components/account/edit/change-password/change-password';
import AccountEditContactDetails from '../../../../components/account/edit/contact-details/contact-details';
import AccountEditPersonalData from '../../../../components/account/edit/personal-data/personal-data';
import Button from '../../../../components/ui-component/button/button';
import AccountEditAuthentication from '../authentication/authentication';
import { yupResolver } from '@hookform/resolvers/yup';
import get from 'lodash/get';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import './edit-form.scss';

const defaultValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  street: '',
  city: '',
  town: '',
  apartment: '',
  zip: '',
  emailFactor: false,
  yubicoFactor: false,
};

const AccountEditForm = () => {
  const dispatch = useDispatch();

  const { accountData = {} } = useSelector((state) => ({
    accountData: state.accountReducer.accountData,
  }));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(userEditSchema()),
  });

  const onSubmit = (data) => {
    const params = {
      firstName: get(data, 'firstName', ''),
      lastName: get(data, 'lastName', ''),
      email: get(data, 'email', ''),
      password: get(data, 'password', ''),
      phone: get(data, 'phone', ''),
      city: get(data, 'city', ''),
      street: get(data, 'street', ''),
      apartment: get(data, 'apartment', ''),
      zip: get(data, 'zip', ''),
    };

    dispatch({ type: accountTypes.PUT_ACCOUNT_DATA, data: params });
  };

  useEffect(() => {
    if (!Object.keys(accountData).length) return;

    setValue('firstName', get(accountData, 'firstName', ''));
    setValue('lastName', get(accountData, 'lastName', ''));
    setValue('phone', get(accountData, 'phone', ''));
    setValue('email', get(accountData, 'email', ''));

    setValue('apartment', get(accountData, 'apartment', ''));
    setValue('street', get(accountData, 'street', ''));
    setValue('city', get(accountData, 'city', ''));
    setValue('zip', get(accountData, 'zip', ''));

    setValue('emailFactor', get(accountData, 'yubicoFactor.emailFactor', false));
    setValue('yubicoFactor', get(accountData, 'yubicoFactor.yubicoFactor', false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountData]);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <AccountEditPersonalData register={register} errors={errors} />
      <AccountEditContactDetails register={register} errors={errors} />
      <AccountEditChangePassword />
      <AccountEditAuthentication />

      <Button type="submit" addClass="account-edit-form__save-btn" title="Save changes" />
    </form>
  );
};

export default AccountEditForm;
