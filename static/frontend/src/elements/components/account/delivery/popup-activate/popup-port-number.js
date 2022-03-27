import './popup-activate.scss';
import actionsTypes from '../../../../../redux/workers/account/account-types';
import Button from '../../../ui-component/button/button';
import Input from '../../../ui-component/input/input';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

const PopupPortNumber = ({ addClass, setIsOpen, setOpenNumberTemp }) => {
  const schema = yup.object().shape({
    pmsisdn: yup.number().required('This field is required'),
    name: yup
      .string()
      .min(2, 'Must contain at least 2 characters')
      .required('This field is required'),
    osp_account_password: yup.string().required('This field is required'),
    osp_account_number: yup.string().required('This field is required'),
    address_line: yup.string().required('This field is required'),
    state: yup.string().required('This field is required'),
    city: yup.string().required('This field is required'),
    zip: yup
      .string()
      .min(5, 'Must contain exactly 5 characters')
      .max(5, 'Must contain exactly 5 characters')
      .required('This field is required'),
  });
  const dispatch = useDispatch();
  const currentProduct = useSelector((state) => state.accountReducer.currentProduct);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const { productId } = currentProduct;

  const states = [
    { short: 'AL', title: 'Alabama' },
    { short: 'AK', title: 'Alaska' },
    { short: 'AZ', title: 'Arizona' },
    { short: 'AR', title: 'Arkansas' },
    { short: 'CA', title: 'California' },
    { short: 'CO', title: 'Colorado' },
    { short: 'CT', title: 'Connecticut' },
    {
      short: 'DC',
      title: 'District of Columbia',
    },
    { short: 'DE', title: 'Delaware' },
    { short: 'FL', title: 'Florida' },
    { short: 'GA', title: 'Georgia' },
    { short: 'HI', title: 'Hawaii' },
    { short: 'ID', title: 'Idaho' },
    { short: 'IL', title: 'Illinois' },
    { short: 'IN', title: 'Indiana' },
    { short: 'IA', title: 'Iowa' },
    { short: 'KS', title: 'Kansas' },
    { short: 'KY', title: 'Kentucky' },
    { short: 'LA', title: 'Louisiana' },
    { short: 'ME', title: 'Maine' },
    { short: 'MD', title: 'Maryland' },
    { short: 'MA', title: 'Massachusetts' },
    { short: 'MI', title: 'Michigan' },
    { short: 'MN', title: 'Minnesota' },
    { short: 'MS', title: 'Mississippi' },
    { short: 'MO', title: 'Missouri' },
    { short: 'MT', title: 'Montana' },
    { short: 'NE', title: 'Nebraska' },
    { short: 'NV', title: 'Nevada' },
    { short: 'NH', title: 'New Hampshire' },
    { short: 'NJ', title: 'New Jersey' },
    { short: 'NM', title: 'New Mexico' },
    { short: 'NY', title: 'New York' },
    { short: 'NC', title: 'North Carolina' },
    { short: 'ND', title: 'North Dakota' },
    { short: 'OH', title: 'Ohio' },
    { short: 'OK', title: 'Oklahoma' },
    { short: 'OR', title: 'Oregon' },
    { short: 'PA', title: 'Pennsylvania' },
    { short: 'RI', title: 'Rhode Island' },
    { short: 'SC', title: 'South Carolina' },
    { short: 'SD', title: 'South Dakota' },
    { short: 'TN', title: 'Tennessee' },
    { short: 'TX', title: 'Texas' },
    { short: 'UT', title: 'Utah' },
    { short: 'VT', title: 'Vermont' },
    { short: 'VA', title: 'Virginia' },
    { short: 'WA', title: 'Washington' },
    { short: 'WV', title: 'West Virginia' },
    { short: 'WI', title: 'Wisconsin' },
    { short: 'WY', title: 'Wyoming' },
    { short: 'AS', title: 'American Samoa' },
    { short: 'GU', title: 'Guam' },
    { short: 'MP', title: 'Northern Mariana Islands' },
    { short: 'PR', title: 'Puerto Rico' },
    { short: 'UM', title: 'United States Minor Outlying Islands' },
    { short: 'VI', title: 'Virgin Islands' },
  ];

  const onSubmit = (data) => {
    const inputState = data.state.toLocaleLowerCase();
    const findedState = states.find(
      (state) =>
        inputState === state.title.toLocaleLowerCase() ||
        inputState === state.short.toLocaleLowerCase()
    );

    if (!findedState) {
      setError('state', {
        type: 'pattern',
        message: 'Not valid, example: New York or NY',
      });

      return;
    }

    data.state = findedState.short;

    dispatch({ type: actionsTypes.LOAD_CHANGE_NUMBER, payload: { ...data, productId } });
    if (onSubmit) {
      setIsOpen(false);
      setOpenNumberTemp(true);
    }
  };

  return (
    <div className={addClass}>
      <h3 className="port-number__title">Port Number:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="port-number__inputs">
          <Input
            {...register('pmsisdn')}
            description={errors.pmsisdn && 'only number'}
            isInvalid={!!errors.pmsisdn}
            type="text"
            placeholder="Enter phone number"
            label="Phone number"
            containerClass="delivery-activate__port"
          />
          <Input
            {...register('osp_account_number')}
            isInvalid={!!errors.osp_account_number}
            description={errors.osp_account_number?.message}
            type="text"
            placeholder="Enter account number"
            label="Account number"
            containerClass="delivery-activate__port"
          />
          <Input
            {...register('name')}
            isInvalid={!!errors.name}
            description={errors.name?.message}
            type="text"
            placeholder="Enter first name"
            label="First name"
            containerClass="delivery-activate__port"
          />
          <Input
            {...register('osp_account_password')}
            isInvalid={!!errors.osp_account_password}
            description={errors.osp_account_password?.message}
            type="password"
            placeholder="Enter pin"
            label="Pin number"
            containerClass="delivery-activate__port"
          />
          <Input
            {...register('address_line')}
            isInvalid={!!errors.address_line}
            description={errors.address_line?.message}
            type="text"
            placeholder="Enter address line"
            label="Address line"
            containerClass="delivery-activate__port"
          />
          <Input
            {...register('state')}
            isInvalid={!!errors.state}
            description={errors.state?.message}
            type="text"
            placeholder="Enter state"
            label="State"
            containerClass="delivery-activate__port"
          />
          <Input
            {...register('city')}
            isInvalid={!!errors.city}
            description={errors.city?.message}
            type="text"
            placeholder="Enter address line"
            label="Address line"
            containerClass="delivery-activate__port"
          />
          <Input
            {...register('zip')}
            isInvalid={!!errors.zip}
            description={errors.zip?.message}
            type="text"
            placeholder="Enter zip"
            label="Zip"
            containerClass="delivery-activate__port"
          />
        </div>
        <div className="port-number-buttons">
          <Button title="Activate" type="submit" addClass="popup-activate__button" />
        </div>
      </form>
    </div>
  );
};

PopupPortNumber.defaultProps = {
  addClass: '',
  setIsOpen: () => {},
  setOpenNumber: () => {},
};

PopupPortNumber.propTypes = {
  addClass: PropTypes.string,
  setIsOpen: PropTypes.func,
  setOpenNumber: PropTypes.func,
};

export default PopupPortNumber;
