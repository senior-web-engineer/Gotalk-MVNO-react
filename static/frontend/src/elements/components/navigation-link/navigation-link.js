import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation-link.scss';

const NavigationLink = ({
  title, path = '/', addClass, onClick,
}) => (
  <NavLink
    onClick={onClick}
    to={path}
    className={addClass}
    activeclassname="navigation-link_active"
  >
    {title}
  </NavLink>
);

NavigationLink.defaultProps = {
  addClass: '',
  onClick: () => {},
};

NavigationLink.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  addClass: PropTypes.string,
  onClick: PropTypes.func,
};

export default NavigationLink;
