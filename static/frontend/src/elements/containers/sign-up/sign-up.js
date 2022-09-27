import './sign-up.scss';
import routes from '../../../navigation/routes';
import authTypes from '../../../redux/workers/auth/auth-types';
import { userSchema } from '../../../shared/schemas/validation-rules';
import Button from '../../components/ui-component/button/button';
import UserInfoForm from '../../components/user-info-form/user-info-form';
import AuthScreen from '../../screens/auth-screen/auth-screen';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import * as yup from 'yup';

const SignUp = () => {
  const schema = yup.object().shape({
    user: userSchema(),
  }).required();
  const methods = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });
  const errorMessage = useSelector((store) => store.authReducer.signUp.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const handleSignUp = (data) => {
    const query = new URLSearchParams(search);
    dispatch({ type: authTypes.SIGN_UP, payload: {
        ...data,
        redirect: navigate,
        iccid: query?.get('iccid') || '',
      }
    });
  };

  return (
    <AuthScreen header="Sign up">
      <section className="sign-up">
        <span className="sign-up__sign-in-suggestion">
          <p className="sign-up__sign-in-text">Already a member?</p>
          <NavLink to={routes.signIn.base} className="sign-up__sign-in-link">Sign In</NavLink>
        </span>
      </section>
      <FormProvider {...methods}>
        <form className="sign-up__form" onSubmit={methods.handleSubmit((data) => handleSignUp(data))}>
          <UserInfoForm parentName="user" />
          <p className="sign-up__error-message">{errorMessage}</p>
          <div className="sign-up__row--submit">
            <Button addClass="sign-up__submit" title="SIGN UP" type="submit" />
          </div>
        </form>
      </FormProvider>
    </AuthScreen>
  );
};
export default SignUp;
