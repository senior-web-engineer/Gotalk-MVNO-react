/* eslint-disable jsx-a11y/control-has-associated-label */
import './popup-activate.scss';
import Button from '../../../ui-component/button/button';
import Popup from '../../../ui-component/popup/popup';
import Spinner from '../../../ui-component/spinner/spinner';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const PopupNumber = ({
  close, title, number, type, typeForm,
}) => {
  const {
    getQRLoading,
    changeNumberLoading,
    activateSimLoading,
    activateEsimLoading,
    errorMessage,
    qrActivate,
  } = useSelector((state) => ({
    getQRLoading: state.loadingReducer.getQRLoading,
    changeNumberLoading: state.loadingReducer.changeNumberLoading,
    activateSimLoading: state.loadingReducer.activateSimLoading,
    activateEsimLoading: state.loadingReducer.activateSimLoading,
    errorMessage: state.accountReducer.errorMessage,
    qrActivate: state.accountReducer.qrActivate,
  }));

  return (
    <Popup close={close}>
      {changeNumberLoading || activateSimLoading || activateEsimLoading ? (
        <div className="spinner-popup-number">
          <Spinner />
        </div>
      ) : (
        <div className="popup-number__title">{title}</div>
      )}
      <p className="popup-number">{number}</p>
      {type === 'esim' && typeForm === 'scanQr' && (
        <>
          <div className="popup-number__title">Your QR code</div>
          {getQRLoading ? (
            <div className="spinner-popup-number">
              <Spinner />
            </div>
          ) : (
            <img alt="qr" src={qrActivate} className="qr-popup-activate" />
          )}
        </>
      )}

      {type === 'esim' && typeForm === 'changedNumber' && (
        <div className="popup-number__title">
          {changeNumberLoading ? (
            <div className="spinner-popup-number">
              <Spinner />
            </div>
          ) : (
            <div>
              {errorMessage === '' ? (
                <div>Your QR code will be available after a while. Update this page </div>
              ) : (
                errorMessage
              )}
            </div>
          )}
        </div>
      )}
      <Button title="OKAY" onClick={close} addClass="popup-number__button" />
    </Popup>
  );
};

PopupNumber.defaultProps = {
  title: '',
  number: '',
  type: '',
  typeForm: '',
  close: () => {},
};

PopupNumber.propTypes = {
  title: PropTypes.string,
  number: PropTypes.string,
  type: PropTypes.string,
  typeForm: PropTypes.string,
  close: PropTypes.func,
};

export default PopupNumber;
