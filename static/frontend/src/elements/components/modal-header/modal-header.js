/* eslint-disable jsx-a11y/no-static-element-interactions */
import loginDoor from '../../../assets/images/login/loginDoor.svg';
import loginPeople from '../../../assets/images/login/signPeople.svg';
import NavigationMenu from '../../containers/navigation-menu/navigation-menu';
import LoginLink from '../login-link/login-link';
import UpHeader from '../up-header/up-header';
import './modal-header.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const ModalHeader = ({ isOpen, setIsOpen }) => {
  const isSignedIn = useSelector((store) => store.authReducer.isSignedIn);
  return (
    <div role="button">
      <div className={isOpen ? 'background-modal view' : 'background-modal'} />
      <div
        className={isOpen ? 'modal-header open' : 'modal-header'}
        onClick={() => setIsOpen(false)}
      >
        <div className="modal-header-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-user-link">
            {isSignedIn && (
              <img src={loginPeople} alt="people" className="login-link__image-item_mobile-modal" />
            )}
            <LoginLink
              onClickLinkLogin={() => setIsOpen(false)}
              isBagShow={false}
              classPlaceholder="placeholder-menu-mobile"
              setIsOpenModalMenu={setIsOpen}
            />
            {!isSignedIn && (
              <img
                src={loginDoor}
                alt="door"
                className="login-link__image-item_mobile-modal__door"
              />
            )}
          </div>
          <NavigationMenu mapNav onLinkClick={() => setIsOpen(false)} addClass="modal-header-nav" classLink="header-link" />
          <UpHeader addClass="modal-header-up" />
        </div>
      </div>
    </div>
  );
};

ModalHeader.defaultProps = {
  isOpen: false,
  setIsOpen: false,
};

ModalHeader.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ModalHeader;
