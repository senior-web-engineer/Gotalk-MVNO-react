import './user-info-form.scss';
import getFieldName from '../../../shared/getFieldName';
import Input from '../ui-component/input/input';
import PropTypes from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import GooglePlaces from "../ui-component/google-places/google-places";
import routes from "../../../navigation/routes";
import {NavLink} from "react-router-dom";

const UserInfoForm = ({ parentName, isBillingUserInfo, onlyCreateAccount }) => {
  const { formState, register, setValue } = useFormContext();
  const errors = formState.errors[parentName] || formState.errors;

  function googleAddressChange(place) {
    setValue(getFieldName('street', parentName), place.formatted_address);

    for(let item of place.address_components) {
      if(item.types.includes('administrative_area_level_1')) {
        setValue(getFieldName('country', parentName), item.long_name);
      } else if(item.types.includes('postal_code')) {
        setValue(getFieldName('zip', parentName), item.long_name);
      } else if(item.types.includes('administrative_area_level_2')) {
        setValue(getFieldName('city', parentName), item.long_name);
      }
    }

    const locality = place.address_components.find(m => m.types.includes('locality'));
    if(locality) {
      setValue(getFieldName('city', parentName), locality.long_name);
    }
  }

  if(onlyCreateAccount) {
    return (
        <>
          <div className="user-info-form__row">
            <div className="user-info-form__col">
              <Input
                  {...register(getFieldName('email', parentName))}
                  description={errors.email?.message}
                  isInvalid={!!errors.email}
                  containerClass="user-info-form__input"
                  placeholder="Enter e-mail address"
                  type="text"
                  label="E-mail address"
              />
            </div>
            <div className="user-info-form__col">
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
          </div>
          <div className="user-info-form__signin_link">
            Are you an existing customer? <NavLink to={routes.signIn.base}>Sign In</NavLink>
          </div>
        </>
    );
  }

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
        {!isBillingUserInfo && (
            <>
              <Input
                  {...register(getFieldName('email', parentName))}
                  description={errors.email?.message}
                  isInvalid={!!errors.email}
                  containerClass="user-info-form__input"
                  placeholder="Enter e-mail address"
                  type="text"
                  label="E-mail address"
              />
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
            </>
        )}
        {isBillingUserInfo && (
            <>
              <Input
                  {...register(getFieldName('phone', parentName))}
                  description={errors.phone?.message}
                  isInvalid={!!errors.phone}
                  containerClass="user-info-form__input"
                  placeholder="Enter telephone number"
                  type="text"
                  label="Telephone number (Optional)"
              />
              <Input
                  {...register(getFieldName('city', parentName))}
                  description={errors.city?.message}
                  isInvalid={!!errors.city}
                  containerClass="user-info-form__input"
                  placeholder="Enter town/city"
                  type="text"
                  label="Town / City"
              />
            </>
        )}
        <Input
            {...register(getFieldName('country', parentName))}
            description={errors.country?.message}
            isInvalid={!!errors.country}
            containerClass="user-info-form__input"
            placeholder="Enter state"
            type="text"
            label="State"
        />
      </div>
      <div className="user-info-form__col">
        <Input
            {...register(getFieldName('lastName', parentName))}
            description={errors.lastName?.message}
            isInvalid={!!errors.lastName}
            containerClass="user-info-form__input"
            placeholder="Enter last name"
            type="text"
            label="Last name"
        />
        <GooglePlaces
            containerClass="user-info-form__input"
            onChange={googleAddressChange}
        />
        {!isBillingUserInfo && (
          <Input
            {...register(getFieldName('phone', parentName))}
            description={errors.phone?.message}
            isInvalid={!!errors.phone}
            containerClass="user-info-form__input"
            placeholder="Enter telephone number"
            type="text"
            label="Telephone number (Optional)"
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
