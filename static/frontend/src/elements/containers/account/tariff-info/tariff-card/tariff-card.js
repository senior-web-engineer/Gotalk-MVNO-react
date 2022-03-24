import AccountTariffInfoPlanCircle from '../../../../components/account/tariff-info/circle/circle';
import AccountTariffInfoPlanParameter from '../../../../components/account/tariff-info/parameter/parameter';
import AccountTariffInfoPlanCard from '../../../../components/account/tariff-info/plan-card/plan-card';
import AccountTariffInfoPlanHeader from '../../../../components/account/tariff-info/plan-header/plan-header';
import Button from '../../../../components/ui-component/button/button';
import Spinner from '../../../../components/ui-component/spinner/spinner';
import classNames from 'classnames';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import './tariff-card.scss';
import { useSelector } from 'react-redux';

const params = [
  'Mollis Ornare Pretium',
  'Donec Convallis Metus',
  'Donec Convallis Metuss',
  'Aenean Pretium',
  'Integer Volutpat',
  'Integer Volutpats',
];

const UNLIMITED_VALUE = 90000000000;

const AccountTariffInfoCard = ({ addClass }) => {
  const account = useSelector((state) => state.accountReducer.accountData);
  const currentProduct = useSelector((state) => state.accountReducer.currentProduct);
  const isCurrentProductLoading = useSelector(
    (state) => state.loadingReducer.currentProductLoading
  );
  const isAccountLoading = useSelector((state) => state.loadingReducer.loadingAccountData);

  const plan = get(currentProduct, 'plan', {});
  const name = get(plan, 'name', '');
  const costPerMonth = get(plan, 'costPerMonth', 0);
  const minuteCount = get(plan, 'minuteCount', 0);
  const SMSCount = get(plan, 'SMSCount', 0);

  const remainder = get(plan, 'remainder', {});
  const min = get(remainder, 'min', 0);

  const subscriberUsage = get(currentProduct, 'querySubscriber.product.usage', {});
  const internetCountUnit = get(subscriberUsage, 'limit.bucket_value.unit', '');
  const internetCountValue = get(subscriberUsage, 'limit.bucket_value.value', '');
  const internetRemaining = get(subscriberUsage, 'remaining.value', 0);
  const sms = get(remainder, 'sms', 0);

  const number = get(currentProduct, 'msisdn', '');

  const classes = classNames('account-tariff-info-card', addClass);

  return (
    <div className={classes}>
      {isCurrentProductLoading || isAccountLoading ? (
        <div className="account-tariff-info__spinner-container">
          <Spinner />
        </div>
      ) : (
        <AccountTariffInfoPlanCard>
          <AccountTariffInfoPlanHeader number={number} tariff={name} sum={costPerMonth} />

          <div className="account-tariff-info__container">
            <div className="account-tariff-info__circles-wrapper">
              <AccountTariffInfoPlanCircle
                isUnlimited={Number(minuteCount) > UNLIMITED_VALUE}
                count={min}
                unit="min"
                max={Number(minuteCount)}
              />
              <AccountTariffInfoPlanCircle
                isUnlimited={internetCountValue > UNLIMITED_VALUE}
                count={internetRemaining}
                unit={internetCountUnit}
                max={internetCountValue}
              />
              <AccountTariffInfoPlanCircle
                isUnlimited={Number(SMSCount) > UNLIMITED_VALUE}
                count={sms}
                unit="SMS"
                max={Number(SMSCount)}
              />
            </div>

            <div className="account-tariff-info__params-wrapper">
              {params.map((param) => (
                <AccountTariffInfoPlanParameter
                  addClass="account-tariff-info__params-item"
                  key={param}
                  title={param}
                />
              ))}
            </div>

            <a href="/" className="account-tariff-info__options-link">
              Add options
            </a>

            <Button addClass="account-tariff-info__change-btn" title="Change the plan" />
          </div>
        </AccountTariffInfoPlanCard>
      )}
    </div>
  );
};

AccountTariffInfoCard.propTypes = {
  addClass: PropTypes.string,
};

export default AccountTariffInfoCard;
