import './email-successful.scss';
import routes from '../../../../../navigation/routes';
import Button from '../../../../components/ui-component/button/button';
import PopupSuccessful from '../../../../components/ui-component/popup-successful/popup-successful';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountEmailVerificationSuccessful = () => {
  const navigate = useNavigate();

  const close = () => navigate(`${routes.account.base}/${routes.account.edit.base}`);

  const handleDone = () => navigate(`${routes.account.base}/${routes.account.edit.base}`);

  useEffect(() => {
    setTimeout(handleDone, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PopupSuccessful close={close}>
      <div className="email-successful">
        <h6 className="email-successful__title">Email verification added successfully</h6>

        <Button addClass="email-successful__btn" title="Done" onClick={handleDone} />
      </div>
    </PopupSuccessful>
  );
};

export default AccountEmailVerificationSuccessful;
