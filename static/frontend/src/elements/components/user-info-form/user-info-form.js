import './user-info-form.scss';
import getFieldName from '../../../shared/getFieldName';
import Input from '../ui-component/input/input';
import PropTypes from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const UserInfoForm = ({ parentName, isBillingUserInfo }) => {
  const { formState, register } = useFormContext();
  const errors = formState.errors[parentName] || formState.errors;

  return (
    <div className="user-info-form__row">
      <div className="user-info-form__col">
        <Input
          {...register(getFieldName('firstName', parentName))}
          description={errors.firstName?.message}
          isInvalid={!!errors.firstName}
          containerClass="user-info-form__input"
          placeholder="Enter first name"
          type="text"
          label="First name"
        />
        <Input
          {...register(getFieldName('lastName', parentName))}
          description={errors.lastName?.message}
          isInvalid={!!errors.lastName}
          containerClass="user-info-form__input"
          placeholder="Enter last name"
          type="text"
          label="Last name"
        />
        <Input
          {...register(getFieldName('email', parentName))}
          description={errors.email?.message}
          isInvalid={!!errors.email}
          containerClass="user-info-form__input"
          placeholder="Enter e-mail address"
          type="text"
          label="E-mail address"
        />
        {isBillingUserInfo && (
          <Input
            {...register(getFieldName('phone', parentName))}
            description={errors.phone?.message}
            isInvalid={!!errors.phone}
            containerClass="user-info-form__input"
            placeholder="Enter telephone number"
            type="text"
            label="Telephone number"
          />
        )}
        <Input
          {...register(getFieldName('password', parentName))}
          description={errors.password?.message}
          isInvalid={!!errors.password}
          containerClass="user-info-form__input"
          placeholder="Enter password"
          type="password"
          label="Password"
        />
        <Input
          {...register(getFieldName('passwordConfirmation', parentName))}
          description={errors.passwordConfirmation?.message}
          isInvalid={!!errors.passwordConfirmation}
          containerClass="user-info-form__input"
          placeholder="Enter confirm password"
          type="password"
          label="Confirm password"
        />
      </div>
      <div className="user-info-form__col">
        {!isBillingUserInfo && (
          <Input
            {...register(getFieldName('phone', parentName))}
            description={errors.phone?.message}
            isInvalid={!!errors.phone}
            containerClass="user-info-form__input"
            placeholder="Enter telephone number"
            type="text"
            label="Telephone number"
          />
        )}
        <Input
          {...register(getFieldName('street', parentName))}
          description={errors.street?.message}
          isInvalid={!!errors.street}
          containerClass="user-info-form__input"
          placeholder="Enter street address"
          type="text"
          label="Enter street address"
        />
        {isBillingUserInfo && (
          <Input
            {...register(getFieldName('city', parentName))}
            description={errors.apartment?.message}
            isInvalid={!!errors.apartment}
            containerClass="user-info-form__input"
            placeholder="Enter town/city"
            type="text"
            label="Town / City"
          />
        )}
        <Input
          {...register(getFieldName('apartment', parentName))}
          description={errors.apartment?.message}
          isInvalid={!!errors.apartment}
          containerClass="user-info-form__input"
          placeholder="Enter apartment, suite, unit"
          type="text"
          label="Apartment, suite, unit"
        />
        <Input
          {...register(getFieldName('country', parentName))}
          description={errors.country?.message}
          isInvalid={!!errors.country}
          containerClass="user-info-form__input"
          placeholder="Enter state"
          type="text"
          label="State"
        />
        <Input
          {...register(getFieldName('zip', parentName))}
          description={errors.zip?.message}
          isInvalid={!!errors.zip}
          containerClass="user-info-form__input"
          placeholder="Enter Zip"
          type="text"
          label="Zip"
        />
      </div>
    </div>
  );
};

UserInfoForm.defaultProps = {
  parentName: null,
  isBillingUserInfo: false,
};

UserInfoForm.propTypes = {
  parentName: PropTypes.string,
  isBillingUserInfo: PropTypes.bool,
};

export default UserInfoForm;
