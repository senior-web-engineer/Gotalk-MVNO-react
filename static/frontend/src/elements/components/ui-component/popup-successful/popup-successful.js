import { ReactComponent as Smile } from '../../../../assets/images/icons/smile.svg';
import Popup from '../popup/popup';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './popup-successful.scss';

const PopupSuccessful = ({ children, addClass, close }) => {
  const classes = classNames('popup-successful', addClass);

  return (
    <Popup addClass={classes} close={close}>
      <div className="popup-successful__icon-wrapper">
        <Smile />
      </div>

      {children}
    </Popup>
  );
};

PopupSuccessful.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  addClass: PropTypes.string,
  close: PropTypes.func,
};

export default PopupSuccessful;
