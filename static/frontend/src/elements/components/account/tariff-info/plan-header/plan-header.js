import PropTypes from 'prop-types';
import React from 'react';
import './plan-header.scss';

const AccountTariffInfoPlanHeader = ({
  number, tariff, sum, period,
}) => (
  <div className="account-tariff-info-plan-header">
    <p className="account-tariff-info-plan-header__number">{number}</p>

    <div className="account-tariff-info-plan-header__info">
      <p className="account-tariff-info-plan-header__tariff">{tariff}</p>
      <p className="account-tariff-info-plan-header__condition">
        <span className="account-tariff-info-plan-header__condition-summ">{`${sum}$`}</span>
        {period}
      </p>
    </div>
  </div>
);

AccountTariffInfoPlanHeader.defaultProps = {
  number: '+1 999 999-99-99',
  tariff: 'Super Online +',
  sum: '$15',
  period: 'PER MONTH',
};

AccountTariffInfoPlanHeader.propTypes = {
  number: PropTypes.string,
  tariff: PropTypes.string,
  sum: PropTypes.number,
  period: PropTypes.string,
};

export default AccountTariffInfoPlanHeader;
