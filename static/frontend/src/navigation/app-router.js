/* eslint-disable max-len */
import routes from './routes';
import HistoryCalls from '../elements/components/account/history-calls/history-calls';
import HistoryPayment from '../elements/components/account/history-payment/history-payment';
import HistorySms from '../elements/components/account/history-sms/history-sms';
import ResetPasswordForm from '../elements/components/reset-password-form/reset-password-form';
import ResetPasswordSuccess from '../elements/components/reset-password-success/reset-password-success';
import RestorePasswordForm from '../elements/components/restore-password-form/restore-password-form';
import SignInCombined from '../elements/components/sign-in-combined/sign-in-combined';
import SignInConfirmation from '../elements/components/sign-in-confirmation/sign-in-confirmation';
import SignInForm from '../elements/components/sign-in-form/sign-in-form';
import SignInYubiKey from '../elements/components/sign-in-yubi-key/sign-in-yubi-key';
import AccountEditAddYubikey from '../elements/containers/account/edit/add-yubikey/add-yubikey';
import AccountEmailVerificationSuccessful from '../elements/containers/account/edit/email-successful/email-successful';
import AccountEditVerificationEmail from '../elements/containers/account/edit/verification-email/verification-email';
import AccountEditYubikeySuccessful from '../elements/containers/account/edit/yubikey-successful/yubikey-successful';
import Bag from '../elements/containers/bag/bag';
import BillingDetails from '../elements/containers/billing-details/billing-details';
import Faq from '../elements/containers/faq/faq';
import HowItWorks from '../elements/containers/how-it-works/how-it-works';
import Blog from '../elements/containers/blog/blog';
import Payment from '../elements/containers/payment/payment';
import RestorePasswordEmail from '../elements/containers/restore-password-email/restore-password-email';
import RestorePassword from '../elements/containers/restore-password/restore-password';
import SignIn from '../elements/containers/sign-in/sign-in';
import SignUp from '../elements/containers/sign-up/sign-up';
import AccountLayout from '../elements/layouts/account-layout/account-layout';
import BaseLayout from '../elements/layouts/base-layout/base-layout';
import AccountScreenDelivery from '../elements/screens/account-screen/account-screen-delivery/account-screen-delivery';
import AccountScreenEdit from '../elements/screens/account-screen/account-screen-edit/account-screen-edit';
import AccountScreenHistory from '../elements/screens/account-screen/account-screen-history/account-screen-history';
import AccountScreenMyPlan from '../elements/screens/account-screen/account-screen-my-plan/account-screen-my-plan';
import AccountScreenTariffInfo from '../elements/screens/account-screen/account-screen-tarif-info/account-screen-tariff-info';
import CardTariff from '../elements/screens/card-tariff/card-tariff';
import AcceptablePolicy from '../elements/screens/footer-pages/acceptable-policy';
import PrivacyPolicy from '../elements/screens/footer-pages/privacy-policy';
import ReturnPolicy from '../elements/screens/footer-pages/return-policy';
import Support from '../elements/screens/footer-pages/support';
import TermsConditions from '../elements/screens/footer-pages/terms-conditions';
import Main from '../elements/screens/main-page/main';
import NotFoundScreen from '../elements/screens/not-found-screen/not-found-screen';
import PlansScreen from '../elements/screens/plans-screen/plans-screen';
import ProtectInfo from '../elements/screens/protect-page/protect-info';
import authTypes from '../redux/workers/auth/auth-types';
import RequireAuth from '../shared/hocs/RequireAuth';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import SetupIntentResult from "../elements/screens/setup-intent-result/setup-intent-result";
import OuterActivation from "../elements/screens/outer-activation/outer-activation";

TagManager.initialize({
  gtmId: 'GTM-NH8F8RN'
});

const AppRouter = ({ history }) => {

  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.authReducer.isSignedIn);
  window.dataLayer.push({
    event: 'pageview'
  });

  useEffect(() => {
    dispatch({ type: authTypes.CHECK_AUTH });

    if (isSignedIn) {
      dispatch({
        type: authTypes.SIGN_IN_SUCCESS,
        payload: JSON.parse(localStorage.getItem('got-user')),
      });
    }
  }, [isSignedIn, dispatch]);
  return (
    <BaseLayout>
      <Routes>
        <Route history={history} exact path={routes.home} element={<Main />} />
        <Route history={history} exact path={routes.signUp} element={<SignUp />} />
        <Route history={history} path={routes.signIn.base} element={<SignIn />}>
          <Route history={history} index element={<SignInForm />} />
          <Route history={history} path={routes.signIn.yubiKey} element={<SignInYubiKey />} />
          <Route history={history} path={routes.signIn.email} element={<SignInConfirmation />} />
          <Route history={history} path={routes.signIn.combined} element={<SignInCombined />} />
        </Route>
        <Route history={history} path={routes.restorePassword.base} element={<RestorePassword />}>
          <Route history={history} index element={<RestorePasswordForm />} />
          <Route
            history={history}
            path={routes.restorePassword.email}
            element={<RestorePasswordEmail />}
          />
          <Route
            history={history}
            path={routes.restorePassword.reset}
            element={<ResetPasswordForm />}
          />
          <Route
            history={history}
            path={`${routes.restorePassword.reset}/:type`}
            element={<ResetPasswordSuccess />}
          />
        </Route>
        <Route history={history} path={routes.tariff} element={<CardTariff />}>
          <Route history={history} path=":id" element={<CardTariff />} />
        </Route>
        <Route history={history} exact path={routes.bag} element={<Bag />} />
        <Route history={history} exact path={routes.billingDetails} element={<BillingDetails />} />
        <Route history={history} exact path={routes.faq} element={<Faq />} />
        <Route history={history} exact path={routes.works} element={<HowItWorks />} />
        <Route history={history} exact path={routes.payment} element={<Payment />} />
        <Route history={history} exact path={routes.plans} element={<PlansScreen />} />
        <Route history={history} path={`${routes.account.base}`} element={<RequireAuth><AccountLayout /></RequireAuth>}>
          <Route history={history} path={routes.account.edit.base} element={<AccountScreenEdit />}>
            <Route
              history={history}
              path={routes.account.edit.registerYubikeyDevice}
              element={<AccountEditAddYubikey />}
            />
            <Route
              history={history}
              path={routes.account.edit.yubikeyRegistrationSuccessful}
              element={<AccountEditYubikeySuccessful />}
            />
            <Route
              history={history}
              path={routes.account.edit.verificationEmailSuccessful}
              element={<AccountEmailVerificationSuccessful />}
            />
            <Route
              history={history}
              path={routes.account.edit.verificationEmailCode}
              element={<AccountEditVerificationEmail />}
            />
          </Route>
          <Route
            history={history}
            path={routes.account.tariffInfo}
            element={<AccountScreenTariffInfo />}
          />
          <Route
            history={history}
            path={routes.account.tracker}
            element={<AccountScreenDelivery />}
          >
            <Route history={history} path=":type" element={<AccountScreenDelivery />} />
          </Route>
          <Route history={history} path={routes.account.myPlan} element={<AccountScreenMyPlan />} />
          <Route
            history={history}
            path={routes.account.history.base}
            element={<AccountScreenHistory />}
          >
            <Route
              history={history}
              path={routes.account.history.calls}
              element={<HistoryCalls />}
            />
            <Route
              history={history}
              path={routes.account.history.payment}
              element={<HistoryPayment />}
            />
            <Route history={history} path={routes.account.history.sms} element={<HistorySms />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
        <Route
          history={history}
          exact
          path={routes.termsConditions}
          element={<TermsConditions />}
        />
        <Route history={history} exact path={routes.support} element={<Support />} />
        <Route history={history} exact path={routes.privacy} element={<PrivacyPolicy />} />
        <Route history={history} exact path={routes.returnPolicy} element={<ReturnPolicy />} />
        <Route history={history} exact path={routes.acceptable} element={<AcceptablePolicy />} />
        <Route history={history} exact path={routes.protect} element={<ProtectInfo />} />
        <Route history={history} exact path={routes.setupIntentResult} element={<SetupIntentResult />}/>
        <Route history={history} exact path={routes.outerActivation} element={<OuterActivation />}/>
        <Route history={history} path={routes.blog} element={<Blog />}>
          <Route history={history} path=":id" element={<Blog />} />
        </Route>
      </Routes>
    </BaseLayout>
  );
};

AppRouter.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AppRouter;
