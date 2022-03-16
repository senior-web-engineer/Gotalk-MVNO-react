import routes from '../../../../../navigation/routes';
import accountTypes from '../../../../../redux/workers/account/account-types';
import { addYubikeySchema } from '../../../../../shared/schemas/validation-rules';
import Button from '../../../../components/ui-component/button/button';
import Input from '../../../../components/ui-component/input/input';
import Popup from '../../../../components/ui-component/popup/popup';
import Spinner from '../../../../components/ui-component/spinner/spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './add-yubikey.scss';

const defaultValues = {
  clientId: '',
  secretKey: '',
  yubicoFactor: '',
};

const AccountEditAddYubikey = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    id,
    verificationYubikeyProgress,
    loadingaccountEditMethodVerification = false,
  } = useSelector((state) => ({
    id: state.accountReducer.accountData.id,
    verificationYubikeyProgress: state.accountReducer.verificationYubikeyProgress,
    loadingaccountEditMethodVerification:
      state.loadingReducer?.loadingaccountEditMethodVerification,
  }));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(addYubikeySchema()),
  });

  const close = () => navigate(-1);

  const handleFormSubmit = (data) => {
    dispatch({
      type: accountTypes.SET_METHOD_VERIFICATION,
      data: { id, type: true, ...data },
    });
  };

  useEffect(() => {
    if (verificationYubikeyProgress.status === 'success') {
      navigate(
        `${routes.account.base}/${routes.account.edit.base}/${routes.account.edit.yubikeyRegistrationSuccessful}`,
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationYubikeyProgress.status]);

  return (
    <Popup close={close} addClass="edit-add-yubikey">
      <div className="account-edit-add-yubikey__container">
        <h6 className="account-edit-add-yubikey__title">Register your Yubikey device</h6>

        {loadingaccountEditMethodVerification && (
          <div className="account-edit-add-yubikey__loader-wrapper">
            <Spinner />
          </div>
        )}

        {!loadingaccountEditMethodVerification && (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="account-edit-add-yubikey__form"
          >
            <Input
              {...register('clientId')}
              type="text"
              label="Client ID"
              placeholder="Insert client ID"
              containerClass="account-edit-add-yubikey__input"
              description={errors.clientId?.message}
              isInvalid={!!errors?.clientId}
            />
            <Input
              {...register('secretKey')}
              type="text"
              label="Security Key"
              placeholder="Insert security key"
              containerClass="account-edit-add-yubikey__input"
              description={errors.secretKey?.message}
              isInvalid={!!errors?.secretKey}
            />
            <Input
              {...register('yubicoFactor')}
              type="text"
              label="Yubikey OTP"
              placeholder="Insert security key"
              containerClass="account-edit-add-yubikey__input"
              description={errors.yubicoFactor?.message}
              isInvalid={!!errors?.yubicoFactor}
            />

            {verificationYubikeyProgress?.message && (
              <p className="account-edit-verification-email__form-error">
                {verificationYubikeyProgress.message}
              </p>
            )}

            <Button
              type="submit"
              addClass="account-edit-add-yubikey__btn"
              title="connect yubikey"
            />
          </form>
        )}
      </div>
    </Popup>
  );
};

export default AccountEditAddYubikey;
