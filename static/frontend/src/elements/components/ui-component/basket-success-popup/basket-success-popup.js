import './basket-success-popup.scss';
import SmileIcon from '../../../../assets/images/icons/smile.svg';
import routes from '../../../../navigation/routes';
import Popup from '../popup/popup';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BasketSuccessPopup = ({ close, onContinue }) => {
  const navigate = useNavigate();

  return (
    <Popup addClass="basket-success-popup" close={close}>
      <img height="48" width="48" src={SmileIcon} className="basket-success-popup__smile-icon" alt="smile" />
      <p className="basket-success-popup__text">Added to bag!</p>
      <div className="basket-success-popup__controls">
        <button
          className="basket-success-popup__continue-button"
          type="button"
          onClick={() => onContinue()}
        >
          CONTINUE SHOPPING
        </button>
        <button
          className="basket-success-popup__bag-button"
          type="button"
          onClick={() => {
            close();
            navigate(routes.bag);
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
        >
          GO TO BAG
        </button>
      </div>
    </Popup>
  );
};

BasketSuccessPopup.propTypes = {
  onContinue: PropTypes.func,
  close: PropTypes.func,
};

export default BasketSuccessPopup;
