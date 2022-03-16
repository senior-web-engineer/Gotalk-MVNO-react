import './billing-details.scss';
import routes from '../../../navigation/routes';
import BillingForm from '../../components/billing-form/billing-form';
import BagScreen from '../../screens/bag-screen/bag-screen';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BillingDetails = () => {
  const navigate = useNavigate();
  const totalPrice = useSelector((state) => state.basketReducer.totalPrice);

  useEffect(() => {
    if (!totalPrice) {
      navigate(routes.bag);
    }

    if (!localStorage.getItem('basket')) {
      navigate(routes.tariff);
    }
  }, [navigate, totalPrice]);

  return (
    <BagScreen>
      <BillingForm onSubmit={(data) => data} />
    </BagScreen>
  );
};

export default BillingDetails;
