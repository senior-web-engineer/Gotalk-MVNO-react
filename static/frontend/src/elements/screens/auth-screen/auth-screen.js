import './auth-screen.scss';
import routes from '../../../navigation/routes';
import NavigationBack from '../../components/ui-component/navigation-back/navigation-back';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AuthScreen = ({ header, children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="auth-screen">
      <NavigationBack to={routes.home} />
      {header && <h1 className="auth-screen__header">{header}</h1>}
      {children}
    </div>
  );
};
AuthScreen.defaultProps = {
  children: React.fragment,
  header: '',
};

AuthScreen.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
};

export default AuthScreen;
