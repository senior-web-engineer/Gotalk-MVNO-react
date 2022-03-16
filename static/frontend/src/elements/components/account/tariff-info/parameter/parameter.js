import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './parameter.scss';

const AccountTariffInfoPlanParameter = ({ addClass, title }) => {
  const classes = classNames('account-tariff-info-plan__parameter', addClass);

  return (
    <div className={classes}>
      <div className="account-tariff-info-plan__parameter-point" />
      <p className="account-tariff-info-plan__parameter-text">{title}</p>
    </div>
  );
};

AccountTariffInfoPlanParameter.defaultProps = {
  title: '',
};

AccountTariffInfoPlanParameter.propTypes = {
  title: PropTypes.string,
};

export default AccountTariffInfoPlanParameter;
