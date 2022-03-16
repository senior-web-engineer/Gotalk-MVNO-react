import './restore-password-email.scss';
import routes from '../../../navigation/routes';
import authTypes from '../../../redux/workers/auth/auth-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const RestorePasswordEmail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.email) {
      navigate(routes.restorePassword.base);
    }
  }, [location.state.email, navigate]);

  const handleResend = () => {
    dispatch({ type: authTypes.RESTORE_PASSWORD, payload: { email: location.state?.email } });
  };

  return (
    <div className="restore-password-email">
      <h1 className="restore-password-email__header">Check your email</h1>
      <p className="restore-password-email__subtitle">
        We have sent a reset password email to
        {' '}
        { location.state?.email || '' }
        .
        Please click the reset password link to set your new password
      </p>
      <p className="restore-password-email__subtitle resend">
        Didn’t receive the email yet? Please, check your spam folder,
        or
        {' '}
        <button
          onClick={handleResend}
          className="restore-password-email__resend-button"
          type="button"
        >
          resend
        </button>
        {' '}
        the email
      </p>
    </div>
  );
};

export default RestorePasswordEmail;
