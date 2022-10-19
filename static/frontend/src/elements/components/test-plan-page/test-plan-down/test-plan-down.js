import './test-plan-down.scss';
import getFieldName from '../../../../shared/getFieldName';
import Input from '../../ui-component/input/input';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../../../components/ui-component/button/button';
import { useFormContext } from 'react-hook-form';
// import GooglePlaces from "../ui-component/google-places/google-places";
// import routes from "../../../navigation/routes";
// import {NavLink} from "react-router-dom";

const TestPlanDown = ({ parentName, isBillingUserInfo, onlyCreateAccount }) => {

  // const { formState, register, setValue } = useFormContext();
  // const errors = formState.errors[parentName] || formState.errors;
  // console.log("parent name", formState.errors[parentName]);
  return (
    <div>
      <h1 className="test-down-first__header">A few lines about the thing <br />second line about it</h1>
      <h1 className="test-down-second__header">Business Enquiry Form</h1>
      <div className="test-form__row">
        <div className="test-form__col">
          <Input
            // {...register(getFieldName('firstName', parentName))}
            // description={errors.firstName?.message}
            // isInvalid={!!errors.firstName}
            containerClass="test-form__input"
            placeholder="Enter Full name"
            type="text"
            label="Full name"
          />

          <>
            <Input
              // {...register(getFieldName('email', parentName))}
              // description={errors.email?.message}
              // isInvalid={!!errors.email}
              containerClass="test-form__input"
              placeholder="Enter e-mail address"
              type="text"
              label="E-mail address"
            />
          </>

          <>
            <Input
              // {...register(getFieldName('phone', parentName))}
              // description={errors.phone?.message}
              // isInvalid={!!errors.phone}
              containerClass="test-form__input"
              placeholder="Enter Number of Prospective Users"
              type="text"
              label="Number of Prospective Users"
            />
            <Input
              // {...register(getFieldName('city', parentName))}
              // description={errors.city?.message}
              // isInvalid={!!errors.city}
              containerClass="test-form__input"
              placeholder="Enter Current Wireless Provider"
              type="text"
              label="Current Wireless Provider"
            />
          </>
        </div>
        <div className="test-form__col">
          <Input
            // {...register(getFieldName('lastName', parentName))}
            // description={errors.lastName?.message}
            // isInvalid={!!errors.lastName}
            containerClass="test-form__input"
            placeholder="Enter Company name"
            type="text"
            label="Company name"
          />

          <Input
            // {...register(getFieldName('phone', parentName))}
            // description={errors.phone?.message}
            // isInvalid={!!errors.phone}
            containerClass="test-form__input"
            placeholder="Enter telephone number"
            type="text"
            label="Telephone number"
          />
          <Input
            // {...register(getFieldName('zip', parentName))}
            // description={errors.zip?.message}
            // isInvalid={!!errors.zip}
            containerClass="test-form__input"
            placeholder="Enter Zip"
            type="text"
            label="Zip"
          />
          <div className="test-submit">
            <Button addClass="test__submit" title="Submit Enquiry" type="submit" />
          </div>
        </div>
      </div>
    </div>
  );
};

TestPlanDown.defaultProps = {
  parentName: null,
  isBillingUserInfo: false,
};

TestPlanDown.propTypes = {
  parentName: PropTypes.string,
  isBillingUserInfo: PropTypes.bool,
};

export default TestPlanDown;
