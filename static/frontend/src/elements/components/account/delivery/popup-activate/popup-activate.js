/* eslint-disable jsx-a11y/control-has-associated-label */
import './popup-activate.scss';
import PopupPortNumber from './popup-port-number';
import actionsTypes from '../../../../../redux/workers/account/account-types';
import Button from '../../../ui-component/button/button';
import Input from '../../../ui-component/input/input';
import Popup from '../../../ui-component/popup/popup';
import classNames from 'classnames';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SimExample from '../../../../../assets/images/account/sim-example.jpg';

const PopupActivate = ({ close, setIsOpen, setOpenNumber, setOpenNumberTemp }) => {
  const [isOpen, setOpen] = useState(false);
  const classesReveal = classNames('drop-activate__button', {
    'drop-activate__button_active': isOpen,
  });
  const params = useParams();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const currentProduct = useSelector((state) => state.accountReducer.currentProduct);
  const productId = get(currentProduct, 'productId', '');

  const onSubmit = (data) => {
    if (params.type === 'physical') {
      dispatch({
        type: actionsTypes.LOAD_ACTIVATE_SIM,
        payload: { ICCID: data.codActivate, productId },
      });
    }
    setIsOpen(false);
    setOpenNumber(true);
  };

  const activateEsim = () => {
    dispatch({
      type: actionsTypes.LOAD_ACTIVATE_ESIM,
      payload: { productId },
    });
    dispatch({
      type: actionsTypes.LOAD_GET_QR,
      payload: { productId },
    });
    setIsOpen(false);
    setOpenNumber(true);
  };

  const classSim = classNames('sim-activate-container', {
    'sim-activate-container-active': isOpen,
  });
  const classESim = classNames('esim-activate-container', {
    'esim-activate-container-active': isOpen,
  });
  return (
    <Popup close={close} addClass={params.type === 'physical' ? classSim : classESim}>
      <div className="popup-activate__title">Activate SIM-card</div>
      {params.type === 'physical' ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="popup-activate__code-block">
            <Input
              {...register('codActivate', {
                required: true,
              })}
              type="text"
              description={errors.codActivate && 'This field is required'}
              placeholder="Enter a code"
              label="Enter a code"
              containerClass="delivery-activate__input"
              isInvalid={!!errors.codActivate}
            />
            {!isOpen && <Button title="Activate" type="submit" addClass="popup-activate__button" />}
          </div>
          <div className="popup-activate__sim-tip">
            <div>
              <img
                src={SimExample}
                className="popup-activate__sim-image"
                style={{
                  width: '196px',
                }}
              />
            </div>
            <div className="popup-activate__sim-tip-text">
              Please enter the first 19 numbers on your Sim Card
            </div>
          </div>
        </form>
      ) : (
        <div className="popup-activate__code-block_esim">
          {!isOpen && (
            <Button
              title="Activate"
              onClick={() => activateEsim()}
              type="submit"
              addClass="popup-activate__button"
            />
          )}
        </div>
      )}
      <div>
        <div className="drop-settings">
          <h4 className="drop-activate">Port number</h4>
          <button type="button" onClick={() => setOpen(!isOpen)} className={classesReveal} />
        </div>
        {isOpen && <PopupPortNumber setIsOpen={setIsOpen} setOpenNumberTemp={setOpenNumberTemp} />}
      </div>
    </Popup>
  );
};

PopupActivate.defaultProps = {
  close: () => {},
};

PopupActivate.propTypes = {
  close: PropTypes.func,
};

export default PopupActivate;
