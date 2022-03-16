import './payment-popup.scss';
import SadFace from '../../../../assets/images/icons/sad.svg';
import Smile from '../../../../assets/images/icons/smile.svg';
import Button from '../../ui-component/button/button';
import Popup from '../../ui-component/popup/popup';
import PropTypes from 'prop-types';
import React from 'react';

const PaymentPopup = ({
  isSuccess, close, onSubmit, message,
}) => (
  <Popup close={close}>
    <div className="payment-popup">
      {isSuccess ? (
        <img className="payment-popup__icon" src={Smile} alt="Smiling face" />
      ) : (
        <img className="payment-popup__icon" src={SadFace} alt="Sad face" />
      )}

      <h2 className="payment-popup__title">
        {isSuccess ? 'Payment successful!' : 'Sorry, payment failed!'}
      </h2>

      <p className="payment-popup__subtitle">{message}</p>

      <Button addClass="payment-popup__submit" title="OKAY" onClick={onSubmit} />
    </div>
  </Popup>
);

PaymentPopup.defaultProps = {
  isSuccess: true,
  close: () => {},
  onSubmit: () => {},
  message: '',
};

PaymentPopup.propTypes = {
  isSuccess: PropTypes.bool,
  close: PropTypes.func,
  onSubmit: PropTypes.func,
  message: PropTypes.string,
};

export default PaymentPopup;
