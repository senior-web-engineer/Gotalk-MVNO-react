import './delivery-info-form.scss';
import getFieldName from '../../../shared/getFieldName';
import Input from '../ui-component/input/input';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const DeliveryInfoForm = ({ parentName, addressData, wide }) => {
  const { formState, register } = useFormContext();
  const errors = formState.errors[parentName] || formState.errors;
  const colClass = classNames('delivery-info-form__col', { 'delivery-info-form__col--wide': wide });
  const contentClass = classNames('delivery-info-form__form-content', { 'delivery-info-form__form-content--wide': wide });
  const inputClass = classNames('delivery-info-form__input', { 'delivery-info-form__input--wide': wide });

  return (
    <div className={contentClass}>
      <div className={colClass}>
        <Input
          {...register(getFieldName('firstName', parentName))}
          description={errors.firstName?.message}
          isInvalid={!!errors.firstName}
          containerClass={inputClass}
          placeholder={addressData?.firstName || 'Enter first name'}
          type="text"
          label="First name"
          disabled={addressData}
        />
        <Input
          {...register(getFieldName('lastName', parentName))}
          description={errors.lastName?.message}
          isInvalid={!!errors.lastName}
          containerClass={inputClass}
          placeholder={addressData?.lastName || 'Enter last name'}
          type="text"
          label="Last name"
          disabled={addressData}
        />
        <Input
          {...register(getFieldName('street', parentName))}
          description={errors.street?.message}
          isInvalid={!!errors.street}
          containerClass={inputClass}
          placeholder={addressData?.street || 'Enter street address'}
          type="text"
          label="Enter street address"
          disabled={addressData}
        />
        <Input
          {...register(getFieldName('city', parentName))}
          description={errors.city?.message}
          isInvalid={!!errors.city}
          containerClass={inputClass}
          type="text"
          label="Town / City"
          placeholder={addressData?.city || 'Enter town/city'}
          disabled={addressData}
        />
      </div>
      <div className={colClass}>
        <Input
          {...register(getFieldName('apartment', parentName))}
          description={errors.apartment?.message}
          isInvalid={!!errors.apartment}
          containerClass={inputClass}
          placeholder={addressData?.apartment || 'Enter apartment, suite, unit'}
          type="text"
          label="Apartment, suite, unit"
          disabled={addressData}
        />
        <Input
          {...register(getFieldName('country', parentName))}
          description={errors.country?.message}
          isInvalid={!!errors.country}
          containerClass={inputClass}
          placeholder={addressData?.country || 'Enter state'}
          type="text"
          label="State"
          disabled={addressData}
        />
        <Input
          {...register(getFieldName('zip', parentName))}
          description={errors.zip?.message}
          isInvalid={!!errors.zip}
          containerClass={inputClass}
          placeholder={addressData?.zip || 'Enter Zip'}
          type="text"
          label="Zip"
          disabled={addressData}
        />
      </div>
    </div>
  );
};

DeliveryInfoForm.defaultProps = {
  parentName: null,
  addressData: null,
  wide: true,
};

DeliveryInfoForm.propTypes = {
  parentName: PropTypes.string,
  addressData: PropTypes.object,
  wide: PropTypes.bool,
};

export default DeliveryInfoForm;
