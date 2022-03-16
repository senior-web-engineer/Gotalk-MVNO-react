import routes from '../../../../../navigation/routes';
import accountTypes from '../../../../../redux/workers/account/account-types';
import Button from '../../../../components/ui-component/button/button';
import Input from '../../../../components/ui-component/input/input';
import Popup from '../../../../components/ui-component/popup/popup';
import Spinner from '../../../../components/ui-component/spinner/spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import './verification-email.scss';

const defaultValues = {
  emailFactor: '',
};

const emailFactorSchema = () => yup.object().shape({
  emailFactor: yup.string().required('This field is required'),
});

const AccountEditVerificationEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    id,
    verificationEmailProgerss,
    loadingaccountEditMethodVerification = true,
  } = useSelector((state) => ({
    id: state.accountReducer.accountData.id,
    verificationEmailProgerss: state.accountReducer.verificationEmailProgerss,
    loadingaccountEditMethodVerification:
      state.loadingReducer?.loadingaccountEditMethodVerification,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(emailFactorSchema()),
  });

  const close = () => navigate(-1);

  const handleSubmitForm = (data) => {
    dispatch({ type: accountTypes.SET_METHOD_VERIFICATION, data: { id, type: true, ...data } });
  };

  useEffect(() => {
    dispatch({ type: accountTypes.SEND_VERIFICATION_EMAIL_CODE });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (verificationEmailProgerss.status === 'success') {
      navigate(
        `${routes.account.base}/${routes.account.edit.base}/${routes.account.edit.verificationEmailSuccessful}`,
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationEmailProgerss.status]);

  return (
    <Popup close={close} addClass="account-edit-verification-email">
      <h6 className="account-edit-verification-email__title">Verification via email code</h6>
      <p className="account-edit-verification-email__desc account-edit-verification-email__info-desc">
        This extra step is to make sure it’s really you trying to change settings
      </p>

      <p className="account-edit-verification-email__desc account-edit-verification-email__step-desc">
        Enter the 2-step verification code we texted to your e-mail
      </p>

      {loadingaccountEditMethodVerification && (
        <div className="account-edit-verification-email__loader-wrapper">
          <Spinner />
        </div>
      )}

      {!loadingaccountEditMethodVerification && (
        <form
          action=""
          onSubmit={handleSubmit(handleSubmitForm)}
          className="account-edit-verification-email__form"
        >
          <Input
            {...register('emailFactor')}
            type="text"
            label="Enter a code"
            placheholder="Enter a code"
            description={errors.emailFactor?.message}
            isInvalid={!!errors?.emailFactor}
          />

          {verificationEmailProgerss?.message && (
            <p className="account-edit-verification-email__form-error">
              {verificationEmailProgerss.message}
            </p>
          )}

          <div className="account-edit-verification-email-form__desc-wrapper">
            <p className="account-edit-verification-email__desc">Didn’t receive the e-mail?</p>
            <a href="/" className="account-edit-verification-email__link">
              Re-send e-mail
            </a>
          </div>

          <div className="account-edit-verification-email-form__footer">
            <Button
              addClass="account-edit-verification-email-form__btn-cancel"
              title="Cancel"
              onClick={close}
            />
            <Button
              type="submit"
              title="Confirm"
              addClass="account-edit-verification-email-form__btn-confirm"
            />
          </div>
        </form>
      )}
    </Popup>
  );
};

export default AccountEditVerificationEmail;
