import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './plan-card.scss';

const AccountTariffInfoPlanCard = ({ addClass, children }) => {
  const classes = classNames('account-tariff-info-plan-card', addClass);

  return <div className={classes}>{children}</div>;
};

AccountTariffInfoPlanCard.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default AccountTariffInfoPlanCard;
