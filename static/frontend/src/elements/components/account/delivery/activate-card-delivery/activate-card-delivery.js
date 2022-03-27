/* eslint-disable max-len */
import routes from '../../../../../navigation/routes';
import actionsTypes from '../../../../../redux/workers/account/account-types';
import Spinner from '../../../ui-component/spinner/spinner';
import ActivateCard from '../../activate-card/activate-card';
import PopupActivate from '../popup-activate/popup-activate';
import PopupNumber from '../popup-activate/popup-number';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './activate-card-delivery.scss';

const ActivateCardDelivery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNumber, setOpenNumber] = useState(false);
  const [isOpenNumberTemp, setOpenNumberTemp] = useState(false);
  const [isScanQR, setScanQR] = useState(false);
  const currentProduct = useSelector((state) => state.accountReducer.currentProduct);
  const activatedESim = useSelector((state) => state.accountReducer.activatedESim);
  const changeNumber = useSelector((state) => state.accountReducer.changeNumber);
  const activationMessage = useSelector((state) => state.accountReducer.activationMessage);
  const navigate = useNavigate();

  const isCurrentProductLoading = useSelector(
    (state) => state.loadingReducer.currentProductLoading
  );

  const dispatch = useDispatch();

  const clickQrScan = () => {
    setScanQR(true);
    dispatch({
      type: actionsTypes.LOAD_GET_QR,
      payload: { productId: currentProduct.productId },
    });
  };

  const handlePopupNumber = () => {
    if (activationMessage === 'Activation successful') {
      navigate(`${routes.account.base}/${routes.account.tariffInfo}`);
    }

    setOpenNumber(false);
  };

  return (
    <section className="section-activity-card">
      <h2 className="activate-title">Activate card</h2>
      {isCurrentProductLoading ? (
        <div className="account-delivery__spinner-container">
          <Spinner />
        </div>
      ) : (
        <ActivateCard
          typeSim={currentProduct?.simType}
          statusActivate={currentProduct?.status}
          title={currentProduct?.plan?.name}
          description={currentProduct?.plan?.description}
          characteristics={currentProduct?.plan?.props}
          price={currentProduct?.plan?.costBuyPlan}
          sms={currentProduct?.plan?.SMSCount}
          internet={currentProduct?.plan?.internetCount}
          minute={currentProduct?.plan?.minuteCount}
          userSimPort={currentProduct?.userSimPort}
          onClick={() => setIsOpen(true)}
          onClickQR={() => clickQrScan()}
        />
      )}
      {isOpen && (
        <PopupActivate
          close={() => setIsOpen(false)}
          setIsOpen={setIsOpen}
          setOpenNumber={setOpenNumber}
          setOpenNumberTemp={setOpenNumberTemp}
        />
      )}
      {isOpenNumber && (
        <PopupNumber
          title={activationMessage}
          type={currentProduct?.simType}
          close={handlePopupNumber}
          typeForm="scanQr"
        />
      )}
      {isOpenNumberTemp && (
        <PopupNumber
          type={currentProduct?.simType}
          close={() => {
            setOpenNumberTemp(false);
          }}
          title={changeNumber.message}
          typeForm="changedNumber"
        />
      )}
      {isScanQR && (
        <PopupNumber
          type={currentProduct?.simType}
          close={() => setScanQR(false)}
          typeForm="scanQr"
          title={activatedESim?.message}
        />
      )}
    </section>
  );
};

export default ActivateCardDelivery;
