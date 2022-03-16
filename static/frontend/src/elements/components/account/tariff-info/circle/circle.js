import PropTypes from 'prop-types';
import React from 'react';
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import './circle.scss';

const AccountTariffInfoPlanCircle = ({
  count, unit, max, isUnlimited,
}) => {
  const data = [
    { name: 'Group A', value: count },
    { name: 'Group B', value: max - count },
  ];

  return (
    <div className="account-tariff-info-plan-circle">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width="100%" height="100%">
          <Pie
            data={data}
            dataKey="value"
            startAngle={-90}
            cx="50%"
            cy="50%"
            innerRadius="87%"
            outerRadius="100%"
            className="account-tariff-info-plan-circle__pie"
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="account-tariff-info-plan-circle__content">
        {isUnlimited ? (
          <p className="account-tariff-info-plan-circle__count">Unlimited</p>
        ) : (
          <>
            <p className="account-tariff-info-plan-circle__unit-wrapper">
              <span className="account-tariff-info-plan-circle__count">{count}</span>
              <span className="account-tariff-info-plan-circle__unit">{unit}</span>
            </p>
            <p className="account-tariff-info-plan-circle__max-wrapper">
              <span className="account-tariff-info-plan-circle__from">from</span>
              <span className="account-tariff-info-plan-circle__max">{max}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

AccountTariffInfoPlanCircle.defaultProps = {
  count: '',
  unit: '',
  max: '',
  isUnlimited: false,
};

AccountTariffInfoPlanCircle.propTypes = {
  count: PropTypes.number,
  unit: PropTypes.string,
  max: PropTypes.number,
  isUnlimited: PropTypes.bool,
};

export default AccountTariffInfoPlanCircle;
