import Input from '../../../ui-component/input/input';
import AccountEditSection from '../section/section';
import PropTypes from 'prop-types';
import React from 'react';
import './personal-data.scss';

const AccountEditPersonalData = ({ register }) => (
  <AccountEditSection title="Personal data">
    <div className="account-screen-form__wrapper">
      <Input
        type="text"
        placeholder="Enter first name"
        label="First name"
        containerClass="account-screen-edit__input"
        {...register('firstName')}
      />
      <Input
        type="text"
        placeholder="Enter last name"
        label="Last name"
        containerClass="account-screen-edit__input"
        {...register('lastName')}
      />
      <Input
        type="tel"
        placeholder="Enter telephone number"
        label="Telephone number"
        containerClass="account-screen-edit__input"
        {...register('phone')}
      />
      <Input
        type="email"
        placeholder="Enter e-mail address"
        label="E-mail address"
        containerClass="account-screen-edit__input"
        {...register('email')}
      />
    </div>
  </AccountEditSection>
);

AccountEditPersonalData.propTypes = {
  register: PropTypes.func,
};

export default AccountEditPersonalData;
