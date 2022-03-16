import './account-screen-history.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AccountScreenHistory = () => (
  <div className="account-screen-history">
    <Outlet />
  </div>
);

export default AccountScreenHistory;
