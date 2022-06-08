import routes from '../../../../navigation/routes';
import actionsTypes from '../../../../redux/workers/account/account-types';
import checkRole, { USER_ROLES } from '../../../../shared/checkRole';
import Button from '../../../components/ui-component/button/button';
import Spinner from '../../../components/ui-component/spinner/spinner';
import classNames from 'classnames';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import './accounts-select.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AccountSelect = ({ addClass }) => {
  const [isOpen, setOpen] = useState(false);
  const {
    user,
    accountProduct,
    accountData,
    currentProduct,
    isAccountProductLoading,
    isAccountLoading,
  } = useSelector((state) => ({
    user: state.authReducer.user,
    accountProduct: state.accountReducer.accountProduct,
    accountData: state.accountReducer.accountData,
    currentProduct: state.accountReducer.currentProduct,
    isAccountProductLoading: state.loadingReducer.accountProductLoading,
    isAccountLoading: state.loadingReducer.loadingAccountData,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOwner = checkRole(user) === USER_ROLES.OWNER;

  const handleAccountSelect = () => setOpen(!isOpen);

  const clickPlan = (id, simType, simStatus) => {
    handleAccountSelect();

    dispatch({ type: actionsTypes.LOAD_CURRENT_PRODUCT, id });

    switch (simStatus) {
      case 'BLOCKED':
        navigate(`${routes.account.tracker}?${simStatus}&id=${id}`);
        break;
      case 'BUSY':
        navigate(`${routes.account.tariffInfo}?id=${id}`);
        break;
      default:
        navigate(`${routes.account.tracker}/${simType}?id=${id}`);
    }
  };

  const getActiveProducts = (products) => {
    const result = products.filter((product) => {
      const userSimPlanId = get(product, 'userSimPlanId', '');

      return !!userSimPlanId;
    });

    return result;
  };

  const buyMore = () => {
    navigate(routes.plans);
  };

  const handleAccount = () => {
    handleAccountSelect();

    navigate(routes.account.edit.base);
  };

  useEffect(() => {
    if (!currentProduct?.productId && accountProduct[0]) {
      const activeProducts = getActiveProducts(accountProduct);
      const firstActiveProduct = get(activeProducts[0], 'userSimPlanId', '');

      if (firstActiveProduct) {
        dispatch({
          type: actionsTypes.LOAD_CURRENT_PRODUCT,
          id: firstActiveProduct,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProduct?.productId, accountProduct]);

  const classes = classNames('account-select', addClass, { 'account-select_active': isOpen });
  const classesReveal = classNames('account-select-user__reveal', {
    'account-select-user__reveal_active': isOpen,
  });
  const classesContent = classNames('account-select-content', {
    'account-select-content_active': isOpen,
  });

  return (
    <div className={classes}>
      {isAccountProductLoading || isAccountLoading ? (
        <div className="account-select__spinner-container">
          <Spinner />
        </div>
      ) : (
        <div className="account-select-wrapper">
          <div className="account-select-mobile__container">
            <p className="account-select-user__mail">{accountData?.email}</p>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button type="button" onClick={handleAccountSelect} className={classesReveal} />
          </div>

          <div className={classesContent}>
            <div className="account-select-content__wrapper">
              <div
                role="button"
                tabIndex="0"
                className="account-select-item"
                onClick={handleAccount}
              >
                <div className="account-select-item__icon">&nbsp;</div>
                <div>
                  <p className="account-select-user__account">Account</p>
                  <p className="account-select-user__mail">{accountData?.email}</p>
                </div>
              </div>

              {isOwner && (
                <div className="account-select-content__link-admin-wrapper">
                  <a
                    href="https://gotalkwireless.com/admin/#/users"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="account-select-content__link-admin"
                  >
                    see list of users
                  </a>
                </div>
              )}
              {!isOwner && (
                <>
                  {accountProduct.map(
                    ({ phone, planName, userSimPlanId, simType, simStatus }) =>
                      userSimPlanId && (
                        <div
                          role="button"
                          tabIndex="0"
                          key={userSimPlanId}
                          className="account-select-item"
                          onClick={() => clickPlan(userSimPlanId, simType, simStatus)}
                        >
                          <div className="account-select-item__icon"></div>
                          <div>
                            <p className="account-select-item__number">{phone}</p>
                            <p className="account-select-item__tariff">{`tariff: ${planName}`}</p>
                          </div>
                        </div>
                      )
                  )}
                </>
              )}
            </div>
            <Button addClass="account-select-buy__btn" onClick={buyMore} title="Buy more" />
          </div>
        </div>
      )}
    </div>
  );
};

AccountSelect.defaultProps = {
  addClass: '',
};

AccountSelect.propTypes = {
  addClass: PropTypes.string,
};

export default AccountSelect;
