import './navigation-back.scss';
import { ReactComponent as ArrowBack } from '../../../../assets/images/icons/arrow.svg';
import useClassnames from '../../../../shared/hooks/useClassnames';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBack = ({ to, className }) => {
  const containerClass = useClassnames('navigation-back', className);

  return (
    <NavLink to={to} className={containerClass}>
      <ArrowBack className="navigation-back__arrow-back" />
      <p className="navigation-back__nav-back-text">Back</p>
    </NavLink>
  );
};

NavigationBack.defaultProps = {
  className: '',
};

NavigationBack.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default NavigationBack;
