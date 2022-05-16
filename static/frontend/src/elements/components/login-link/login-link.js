import bag from '../../../assets/images/icons/bag.svg';
import loginPeople from '../../../assets/images/login/signPeople.svg';
import routes from '../../../navigation/routes';
import authTypes from '../../../redux/workers/auth/auth-types';
import basketTypes from '../../../redux/workers/basket/basket-types';
import { getBasketItems } from '../../../shared/basketActions';
import HeaderDropdown from '../ui-component/dropdown/header-dropdown';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './login-link.scss';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from "../ui-component/button/button";

const LoginLink = ({
  isBagShow, onClickLinkLogin, classPlaceholder, setIsOpenModalMenu,
}) => {
  const {
    firstName = '',
    lastName = '',
    basketItemsCount = 0,
    isSignedIn = false,
  } = useSelector((store) => ({
    basketItemsCount: store.basketReducer.totalCount,
    isSignedIn: store.authReducer.isSignedIn,
    firstName: store.authReducer.user.firstName,
    lastName: store.authReducer.user.lastName,
  }));
  const [placeholderName, setPlaceholderName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      setPlaceholderName(`${firstName} ${lastName?.substr(0, 1)}.`);
    }
  }, [firstName, isSignedIn, lastName]);

  useEffect(() => {
    dispatch({
      type: basketTypes.BASKET_UPDATE,
      payload: { totalCount: getBasketItems().length },
    });
  }, [dispatch]);

  const handleExit = () => {
    localStorage.setItem('got-accessToken', '');
    localStorage.setItem('got-user', '');
    dispatch({ type: authTypes.LOGOUT });
    navigate(routes.signIn.base);
  };

  return (
    <div className="login-link-block">
      {isSignedIn ? (
        <HeaderDropdown
          placeholder={placeholderName || ''}
          accountPath={routes.account.base}
          onExit={handleExit}
          classPlaceholder={classPlaceholder}
          setIsOpenModalMenu={setIsOpenModalMenu}
        />
      ) : (
        <NavLink className="login-link__item" onClick={onClickLinkLogin} to={routes.signIn.base}>
          Sign in
        </NavLink>
      )}
      {isBagShow && (
        <div className="login-link__image">
          {isSignedIn && (
            <img src={loginPeople} alt="people" className="login-link__image-item_mobile" />
          )}
          <NavLink className="login-link__item bag" to={routes.bag}>
            <img src={bag} alt="bag" className="login-link__image-item" />
            {basketItemsCount > 0 && <p className="login-link__basket-items">{basketItemsCount}</p>}
            <p className="login-link__text">Bag</p>
          </NavLink>
        </div>
      )}
      <Button
          onClick={() => {
            navigate(routes.plans);
          }}
          addClass="button header-plan-button"
          title="Find a Plan"
      />
    </div>
  );
};

LoginLink.defaultProps = {
  isBagShow: true,
  onClickLinkLogin: () => {},
  setIsOpenModalMenu: () => {},
  classPlaceholder: '',
};

LoginLink.propTypes = {
  isBagShow: PropTypes.bool,
  onClickLinkLogin: PropTypes.func,
  classPlaceholder: PropTypes.string,
  setIsOpenModalMenu: PropTypes.func,
};

export default LoginLink;
