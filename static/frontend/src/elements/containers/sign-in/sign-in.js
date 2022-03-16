import './sign-in.scss';
import AuthScreen from '../../screens/auth-screen/auth-screen';
import React from 'react';
import { Outlet } from 'react-router-dom';

const SignIn = () => (
  <AuthScreen header="Sign in">
    <section className="sign-in">
      <Outlet />
    </section>
  </AuthScreen>
);

SignIn.defaultProps = {

};

SignIn.propTypes = {

};

export default SignIn;
