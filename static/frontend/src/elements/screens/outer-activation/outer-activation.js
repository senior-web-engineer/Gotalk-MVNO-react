import './outer-activation.scss';
import * as yup from "yup";
import {outerActivationSchema} from "../../../shared/schemas/validation-rules";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import authTypes from "../../../redux/workers/auth/auth-types";
import AuthScreen from "../auth-screen/auth-screen";
import React from "react";
import Button from "../../components/ui-component/button/button";
import OuterActivationForm from "../../components/outer-activation-form/outer-activation-form";
import Spinner from "../../components/ui-component/spinner/spinner";

export default function OuterActivation() {

    const schema = yup.object().shape({
        outerActivation: outerActivationSchema(),
    }).required();
    const methods = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });
    const errorMessage = useSelector((store) => store.authReducer.outerActivation.error);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const outerActivationLoading = useSelector((state) => state.loadingReducer.outerActivationLoading);

    const handleOuterActivation = (data) => {
        dispatch({ type: authTypes.OUTER_ACTIVATION, payload: { ...data, redirect: navigate } });
    };

    return (
      <AuthScreen header="Activate">
          <FormProvider {...methods}>
              <form className="outer-activation__form" onSubmit={methods.handleSubmit((data) => handleOuterActivation(data), console.log)}>
                  <OuterActivationForm parentName="outerActivation" />
                  {outerActivationLoading && <Spinner addClass="text-center"/>}
                  <p className="outer-activation__error-message">{errorMessage}</p>
                  <div className="outer-activation__row--submit">
                      <Button addClass="outer-activation__submit" title="SUBMIT" type="submit" />
                  </div>
              </form>
          </FormProvider>
      </AuthScreen>
    );
}
