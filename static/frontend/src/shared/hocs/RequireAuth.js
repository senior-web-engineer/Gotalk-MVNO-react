import Spinner from '../../elements/components/ui-component/spinner/spinner';
import routes from '../../navigation/routes';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const isSignedIn = useSelector((state) => state.authReducer.isSignedIn);
  const isCheckingAuth = useSelector((state) => state.loadingReducer.checkAuthLoading);

  if (isCheckingAuth) {
    return (
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        zIndex: '10000',
        backgroundColor: 'white',
      }}
      >
        <Spinner />
      </div>
    );
  }

  if (isSignedIn) {
    return children;
  }

  return <Navigate to={routes.signIn.base} />;
};

RequireAuth.defaultProps = {
  children: React.Fragment,
};

RequireAuth.propTypes = {
  children: PropTypes.node,
};

export default RequireAuth;
