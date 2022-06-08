import routes from '../../../navigation/routes';
import accountTypes from '../../../redux/workers/account/account-types';
import AccountHeader from '../../components/account/header/header';
import AccountSelect from '../../containers/account/accounts-select/accounts-select';
import React, {useEffect, useMemo} from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './account-layout.scss';
import AccountSidebar from "../../containers/account/account-sidebar/account-sidebar";

const AccountLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch({ type: accountTypes.GET_ACCOUNT_DATA });
    dispatch({ type: accountTypes.LOAD_PRODUCT });
  }, []);

  useEffect(() => {
    if (pathname === '/account') {
      navigate(routes.account.edit.base);
    }
  }, [navigate, pathname]);

  const showSidebar = useMemo(() => pathname.startsWith('/account/tariff-info'), [pathname]);

  return (
    <div className="account-layout">
      <AccountHeader />
      <div className="account-layout-container">
        <AccountSelect addClass="account-layout__account-select" />
        <Outlet />
        {showSidebar && <AccountSidebar />}
      </div>
    </div>
  );
};

export default AccountLayout;
