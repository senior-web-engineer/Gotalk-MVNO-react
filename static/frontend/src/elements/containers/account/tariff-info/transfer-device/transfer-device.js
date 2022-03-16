import { ReactComponent as MockQrCode } from '../../../../../assets/images/account/mock-qr-code.svg';
import AccountTariffInfoPlanCard from '../../../../components/account/tariff-info/plan-card/plan-card';
import classNames from 'classnames';
import React from 'react';
import './transfer-device.scss';

const AccountTariffInfoTransferDevice = ({ addClass }) => {
  const classes = classNames('account-tariff-info-transfer-device', addClass);

  return (
    <div className={classes}>
      <AccountTariffInfoPlanCard addClass="account-tariff-info-transfer-device__wrapper">
        <h6 className="account-tariff-info-transfer-device__title">
          Transfer an account to a new device
        </h6>

        <div className="account-tariff-info-transfer-device__code-wrapper">
          <MockQrCode />
        </div>

        <button className="account-tariff-info-transfer-device__link-generate">
          GENERATE QR-CODE
        </button>
      </AccountTariffInfoPlanCard>
    </div>
  );
};

export default AccountTariffInfoTransferDevice;
