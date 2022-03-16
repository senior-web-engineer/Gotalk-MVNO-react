import routes from '../../../../../navigation/routes';
import AccountEditSection from '../../../../components/account/edit/section/section';
import Checkbox from '../../../../components/ui-component/checkbox/checkbox';
import get from 'lodash/get';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './authentication.scss';

const AccountEditAuthentication = () => {
  const navigate = useNavigate();
  const { accountData } = useSelector((state) => ({
    accountData: state.accountReducer.accountData,
  }));

  const emailFactor = get(accountData, 'multiFactors.emailFactor', false);
  const yubicoFactor = get(accountData, 'multiFactors.yubicoFactor', false);

  const changeEmail = () => {
    navigate(
      `${routes.account.base}/${routes.account.edit.base}/${routes.account.edit.verificationEmailCode}`,
    );
  };

  const changeYubiKey = () => {
    navigate(
      `${routes.account.base}/${routes.account.edit.base}/${routes.account.edit.registerYubikeyDevice}`,
    );
  };

  return (
    <AccountEditSection addClass="account-screen-auth__section" title="Authentication">
      <div className="account-screen-form__wrapper account-screen-auth-form__wrapper">
        <Checkbox
          label="Connect authentication via email"
          addClass="account-screen__checkbox"
          checked={emailFactor}
          onChange={changeEmail}
        />
        <Checkbox
          label="Connect authentication via YubiKey"
          addClass="account-screen__checkbox"
          checked={yubicoFactor}
          onChange={changeYubiKey}
        />
      </div>
    </AccountEditSection>
  );
};

export default AccountEditAuthentication;
