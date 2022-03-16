import Spinner from '../../../components/ui-component/spinner/spinner';
import AccountEditForm from '../../../containers/account/edit/edit-form/edit-form';
import React from 'react';
import { useSelector } from 'react-redux';
import './account-screen-edit.scss';
import { Outlet } from 'react-router-dom';

const AccountScreenEdit = () => {
  const { loadingAccountData = true } = useSelector((state) => ({
    loadingAccountData: state.loadingReducer?.loadingAccountData,
  }));

  return (
    <div className="account-screen-edit">
      {loadingAccountData && <Spinner addClass="account-screen-edit__spinner" />}
      {!loadingAccountData && <AccountEditForm />}

      <Outlet />
    </div>
  );
};

export default AccountScreenEdit;
