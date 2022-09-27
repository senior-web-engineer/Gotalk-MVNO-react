import AccountTariffInfoCard from '../../../containers/account/tariff-info/tariff-card/tariff-card';
import AccountTariffInfoTransferDevice from '../../../containers/account/tariff-info/transfer-device/transfer-device';
import React from 'react';
import './account-screen-tariff-info.scss';
import AccountTariffInfoShowQRCode from "../../../containers/account/tariff-info/show-qr-code/show-qr-code";

const AccountScreenTariffInfo = () => (
  <div className="account-screen-tariff-info">
    <div className="account-screen-tariff-info__container">
      <AccountTariffInfoCard addClass="account-tariff-info__card" />

      {/* TODO in inprogress */}
      {/* <AccountTariffInfoBalance addClass="account-tariff-info__balance" /> */}
    </div>

      <AccountTariffInfoShowQRCode />
    <AccountTariffInfoTransferDevice addClass="account-tariff-info-transfer__device" />
  </div>
);

export default AccountScreenTariffInfo;
