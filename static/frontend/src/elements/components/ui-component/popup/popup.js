import './popup.scss';
import { ReactComponent as CrossIcon } from '../../../../assets/images/icons/cross.svg';
import usePortal from '../../../../shared/hooks/usePortal';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Popup = ({ children, close, addClass }) => {
  const [portalId, isLoaded] = usePortal(true);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!popupRef.current?.contains(e.target)) {
        if (close) {
          close();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('touchend', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('touchend', handleClickOutside);
    };
  }, [close]);

  return isLoaded ? ReactDOM.createPortal(
    <div ref={popupRef} className={`popup ${addClass}`}>
      <div className="popup__close-button-container">
        <button aria-label="Button to close a popup" type="button" onClick={close}><CrossIcon /></button>
      </div>
      <div className="popup__content">
        {children}
      </div>
    </div>,
    document.getElementById(portalId),
  ) : null;
};

Popup.defaultProps = {
  addClass: '',
  children: React.fragment,
  close: () => {},
};

Popup.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func,
  addClass: PropTypes.string,
};

export default Popup;
