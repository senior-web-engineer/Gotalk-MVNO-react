import routes from '../../../../navigation/routes';
import NavigationBack from '../../ui-component/navigation-back/navigation-back';
import React from 'react';

import './header.scss';

const AccountHeader = () => (
  <div className="account-screen-header">
    <NavigationBack to={routes.home} className="account-screen-header__back" />

    <h2 className="account-screen-header__title">Personal account</h2>
  </div>
);

export default AccountHeader;
