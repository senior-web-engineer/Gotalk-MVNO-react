import Input from '../../../ui-component/input/input';
import AccountEditSection from '../section/section';
import PropTypes from 'prop-types';
import React from 'react';
import './contact-details.scss';

const AccountEditContactDetails = ({ register }) => (
  <AccountEditSection title="Contact details">
    <div className="account-screen-form__wrapper">
      <Input
        type="text"
        placeholder="Enter street address"
        label="Street address"
        containerClass="account-screen-edit__input"
        {...register('street')}
      />
      <Input
        type="text"
        placeholder="Enter city"
        label="City"
        containerClass="account-screen-edit__input"
        {...register('city')}
      />
      <Input
        type="text"
        placeholder="Enter apartment, suite, unit"
        label="Apartment, suite, unit"
        containerClass="account-screen-edit__input"
        {...register('apartment')}
      />
      <Input
        type="text"
        placeholder="Enter Zip"
        label="Zip"
        containerClass="account-screen-edit__input"
        {...register('zip')}
      />
      <Input
        type="text"
        placeholder="Enter town/city"
        label="Town / City"
        containerClass="account-screen-edit__input"
        {...register('town')}
      />
    </div>
  </AccountEditSection>
);

AccountEditContactDetails.propTypes = {
  register: PropTypes.func,
};

export default AccountEditContactDetails;
