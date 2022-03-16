import routes from '../../../navigation/routes';
import accountTypes from '../../../redux/workers/account/account-types';
import AccountHeader from '../../components/account/header/header';
import AccountSelect from '../../containers/account/accounts-select/accounts-select';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import './account-layout.scss';

const AccountLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch({ type: accountTypes.GET_ACCOUNT_DATA });
    dispatch({ type: accountTypes.LOAD_PRODUCT });
    navigate(routes.account.edit.base);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pathname === '/account') {
      navigate(routes.account.edit.base);
    }
  }, [navigate, pathname]);

  return (
    <div className="account-layout">
      <AccountHeader />

      <div className="account-layout-container">
        <AccountSelect addClass="account-layout__account-select" />

        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
