import logo from '../../../../assets/images/logo/logo.svg';
import routes from '../../../../navigation/routes';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './banner.scss';

const Banner = () => (
  <section className="section-banner">
    <h2 className="section-banner__title">Over $100m lost to Sim Swap Fraud</h2>
    <div className="section-banner__sub-title">
      <NavLink to={routes.protect}>Protect Yourself with</NavLink>
      <img src={logo} alt="logo" className="section-banner__sub-logo" />
    </div>
  </section>
);

export default Banner;
