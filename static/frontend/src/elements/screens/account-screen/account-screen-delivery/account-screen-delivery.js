import ActivateCardDelivery from '../../../components/account/delivery/activate-card-delivery/activate-card-delivery';
import Tracker from '../../../components/account/delivery/tracker/tracker';
import React from 'react';
import './account-screen-delivery.scss';
import { useParams, useLocation } from 'react-router-dom';

const AccountScreenDelivery = () => {
  const params = useParams();
  const location = useLocation();

  const renderContent = () => {
    if (params.type !== 'esim') {
      return (
        <>
          <Tracker />
          <ActivateCardDelivery />
        </>
      );
    }
    return <ActivateCardDelivery />;
  };

  return (
    <div className="account-screen-delivery-container">
      {location.search === '?BLOCKED' ? <h2 className="account-title">Sorry, your SIM card is blocked</h2> : renderContent()}
    </div>
  );
};

export default AccountScreenDelivery;
