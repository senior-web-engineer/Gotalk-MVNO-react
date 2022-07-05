/* eslint-disable jsx-a11y/no-static-element-interactions */
import './base-header.scss';
import burger from '../../../assets/images/icons/burger.svg';
import logo from '../../../assets/images/logo/logo.svg';
import routes from '../../../navigation/routes';
import LoginLink from '../../components/login-link/login-link';
import ModalHeader from '../../components/modal-header/modal-header';
import UpHeader from '../../components/up-header/up-header';
import NavigationMenu from '../navigation-menu/navigation-menu';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DownHeader from "../../components/down-header/down-header";

const BaseHeader = ({ classSticky, classUp }) => {
  const [openModal, setOpenModal] = useState(false);
  const clickTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <header className={`base-header ${classSticky}`}>
      <UpHeader addClass={classUp} />
      <div className="header-container">
        <div className="header-burger" onClick={() => setOpenModal(true)}>
          <img src={burger} alt="menu" className="header-burger" />
        </div>
        <div className="header-logo-block" onClick={clickTop}>
          <ModalHeader isOpen={openModal} setIsOpen={setOpenModal} />
          <NavLink to={routes.home} className="header-logo">
            <img src={logo} alt="GoTalk" className="header-logo" />
          </NavLink>
        </div>
        <NavigationMenu mapNav />
        <LoginLink />
      </div>
      <DownHeader addClass={classUp} />
    </header>
  );
};
BaseHeader.defaultProps = {
  classSticky: '',
};

BaseHeader.propTypes = {
  classSticky: PropTypes.string,
};
export default BaseHeader;
