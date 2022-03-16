import './reset-password-success.scss';
import routes from '../../../navigation/routes';
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ResetPasswordSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    if (!location.state?.resetSuccess || params.type !== 'success') {
      navigate(routes.home);
    }
  }, [navigate, location.state?.resetSuccess, params.type, location]);

  return (
    <div className="reset-password-success">
      <h1 className="reset-password-success__header">Password changed successfully</h1>
      <button
        className="reset-password-success__button"
        type="button"
        onClick={() => {
          navigate(routes.signIn.base);
        }}
      >
        GO TO SIGN IN
      </button>
    </div>
  );
};

export default ResetPasswordSuccess;
