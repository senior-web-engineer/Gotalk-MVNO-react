/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable-loop */
import './tracker.scss';
import { ReactComponent as AcceptanceBox } from '../../../../../assets/images/delivery/acceptanceBox.svg';
import { ReactComponent as Activated } from '../../../../../assets/images/delivery/delivered.svg';
import { ReactComponent as Processing } from '../../../../../assets/images/delivery/dispatch.svg';
import { ReactComponent as Shipped } from '../../../../../assets/images/delivery/sent.svg';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Tracker = () => {
  const [progressPath, setProgressPath] = useState('processed');
  const stack = [1, 2, 3, 4, 5, 6, 7, 8];
  const stackMini = [1, 2];

  const dispatch = useDispatch();
  const currentProduct = useSelector((store) => store.accountReducer.currentProduct);

  useEffect(() => {
    setProgressPath(currentProduct?.delivery?.status);
  }, [currentProduct]);

  const renderLoaderColor = () => {
    const progress = 40;
    return stack.map(() => (progress > 50 ? (
      <div className="tracker-stack-load" />
    ) : (
      <div className="tracker-stack-no-load" />
    )));
  };

  const renderLoader = () => stack.map(() => (progressPath === 'delivered' ? (
    <div className="tracker-stack-color" />
  ) : (
    <div className="tracker-stack" />
  )));

  const renderLoaderProcess = () => stack.map(() => (progressPath !== 'processed' ? (
    <div className="tracker-stack-color" />
  ) : (
    <div className="tracker-stack" />
  )));

  const renderLoaderColorMini = () => {
    const progress = 40;
    return stackMini.map(() => (progress > 50 ? (
      <div className="tracker-stack-load" />
    ) : (
      <div className="tracker-stack-no-load" />
    )));
  };

  const renderLoaderMini = () => stackMini.map(() => (progressPath === 'delivered' ? (
    <div className="tracker-stack-color" />
  ) : (
    <div className="tracker-stack" />
  )));

  const renderLoaderProcessMini = () => stackMini.map(() => (progressPath !== 'processed' ? (
    <div className="tracker-stack-color" />
  ) : (
    <div className="tracker-stack" />
  )));

  if(currentProduct?.isOuterSellingSim) {
    return null;
  }

  return (
    <section className="tracker">
      <h2 className="tracker-title">Path tracker</h2>
      <div className="tracker-content">
        <div className="tracker-content__item">
          <div className="tracker-item">
            <div
              className={
                progressPath === 'processed'
                  ? 'tracker-item__image tracker-active'
                  : 'tracker-item__image'
              }
            >
              <AcceptanceBox className="tracker-img" />
            </div>
            <div className="tracker-item__text">Acceptance</div>
          </div>
          <div className="track-indemnificator">
            {progressPath === 'processed' ? renderLoaderColor() : renderLoaderProcess()}
          </div>
          <div className="track-indemnificator-mini">
            {progressPath === 'processed' ? renderLoaderColorMini() : renderLoaderProcessMini()}
          </div>
        </div>
        <div className="tracker-content__item">
          <div className="tracker-item">
            <div
              className={
                progressPath === 'dispatch'
                  ? 'tracker-item__image tracker-active'
                  : 'tracker-item__image'
              }
            >
              <Processing className="tracker-img" />
            </div>
            <div className="tracker-item__text">Processing</div>
          </div>
          <div className="track-indemnificator">
            {progressPath === 'dispatch' ? renderLoaderColor() : renderLoaderProcess()}
          </div>
          <div className="track-indemnificator-mini">
            {progressPath === 'dispatch' ? renderLoaderColorMini() : renderLoaderProcessMini()}
          </div>
        </div>
        <div className="tracker-content__item">
          <div className="tracker-item">
            <div
              className={
                progressPath === 'sent'
                  ? 'tracker-item__image tracker-active'
                  : 'tracker-item__image'
              }
            >
              <Shipped className="tracker-img" />
            </div>
            <div className="tracker-item__text">Shipped</div>
          </div>
          <div className="track-indemnificator">
            {progressPath === 'sent' ? renderLoaderColor() : renderLoader()}
          </div>
          <div className="track-indemnificator-mini">
            {progressPath === 'sent' ? renderLoaderColorMini() : renderLoaderMini()}
          </div>
        </div>
        <div className="tracker-content__item">
          <div className="tracker-item">
            <div
              className={
                progressPath === 'delivered'
                  ? 'tracker-item__image tracker-active'
                  : 'tracker-item__image'
              }
            >
              <Activated className="tracker-img" />
            </div>
            <div className="tracker-item__text">Activated</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracker;
