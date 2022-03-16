import './restore-password.scss';
import AuthScreen from '../../screens/auth-screen/auth-screen';
import React from 'react';
import { Outlet } from 'react-router-dom';

const RestorePassword = () => (
  <AuthScreen>
    <Outlet />
  </AuthScreen>
);

export default RestorePassword;
