import './payment.scss';
import routes from '../../../navigation/routes';
import PaymentForm from '../../components/payment-form/payment-form';
import NavigationBack from '../../components/ui-component/navigation-back/navigation-back';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';

const reactAppStripeKey = process.env.REACT_APP_STRIPE_PK || '';

const stripePromise = loadStripe(reactAppStripeKey);

const Payment = () => (
  <Elements stripe={stripePromise}>
    <div className="payment">
      <NavigationBack to={routes.home} />
      <PaymentForm />
    </div>
  </Elements>
);

export default Payment;
