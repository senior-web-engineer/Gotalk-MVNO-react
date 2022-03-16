import Button from '../../../../components/ui-component/button/button';
import Input from '../../../../components/ui-component/input/input';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './balance.scss';

const AccountTariffInfoBalance = ({ addClass }) => {
  const classes = classNames('account-tariff-info-balance', addClass);

  return (
    <div className={classes}>
      <div className="account-tariff-info-balance__header">
        <p>Balance</p>
        <p>$30</p>
      </div>

      <div className="account-tariff-info-balance__main">
        <p className="account-tariff-info-balance__date">Next write-off 10/10/2021</p>

        <form className="account-tariff-info-balance-form account-tariff-info-balance__form">
          <Input placeholder="$500" />
          <Button addClass="account-tariff-info-balance-form__btn" title="BUY" />
        </form>

        <p className="account-tariff-info-balance__limit">from $500 to $15 000 </p>
      </div>

      <a href="/" className="account-tariff-info-balance__history-link">
        View payment history
      </a>
    </div>
  );
};

AccountTariffInfoBalance.propTypes = {
  addClass: PropTypes.string,
};

export default AccountTariffInfoBalance;
