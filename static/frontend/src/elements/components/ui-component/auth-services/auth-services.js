import './auth-services.scss';
import { ReactComponent as Facebook } from '../../../../assets/images/icons/facebook.svg';
import { ReactComponent as Google } from '../../../../assets/images/icons/google.svg';
import { ReactComponent as LinkedIn } from '../../../../assets/images/icons/linkedin.svg';
import { ReactComponent as Twitter } from '../../../../assets/images/icons/twitter.svg';
import PropTypes from 'prop-types';
import React from 'react';

const AuthServices = ({ header, containerClass }) => (
  <div className={`services ${containerClass}`}>
    <h3 className="services__header">{header}</h3>
    <ul className="services__list">
      <li className="services__list-item">
        <button
          onClick={() => {}}
          aria-label="Google authorization"
          type="button"
          className="services__link"
        >
          <Google />
        </button>
      </li>
      <li className="services__list-item">
        <button
          onClick={() => {}}
          aria-label="Facebook authorization"
          type="button"
          className="services__link"
        >
          <Facebook />
        </button>
      </li>
      <li className="services__list-item">
        <button
          onClick={() => {}}
          aria-label="Twitter authorization"
          type="button"
          className="services__link"
        >
          <Twitter />
        </button>
      </li>
      <li className="services__list-item">
        <button
          onClick={() => {}}
          aria-label="LinkedIn authorization"
          type="button"
          className="services__link"
        >
          <LinkedIn />
        </button>
      </li>
    </ul>
  </div>
);

AuthServices.defaultProps = {
  header: '',
  containerClass: '',
};

AuthServices.propTypes = {
  header: PropTypes.string,
  containerClass: PropTypes.string,
};

export default AuthServices;
