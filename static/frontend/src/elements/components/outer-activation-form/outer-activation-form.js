import './outer-activation-form.scss';
import {useFormContext} from "react-hook-form";
import getFieldName from "../../../shared/getFieldName";
import Input from "../ui-component/input/input";
import React, {useState} from "react";
import Popup from "../ui-component/popup/popup";
import SimExample from "../../../assets/images/account/sim-example.jpg";
import Info from "../../../assets/images/icons/info.svg";

export default function OuterActivationForm({parentName}) {

    const { formState, register } = useFormContext();
    const errors = formState.errors[parentName] || formState.errors;
    const [iccidPopupShow, setIccidPopupShow] = useState(false);

    return (
        <div className="outer-activation-form__col">
            <Input
                {...register(getFieldName('iccid', parentName))}
                description={errors.iccid?.message}
                isInvalid={!!errors.iccid}
                containerClass="outer-activation-form__input"
                placeholder="Enter ICCID"
                type="text"
                label={(
                    <div className="outer-activation-form__info-label">
                        ICCID
                        <div className="outer-activation-form__info-button" onClick={() => setIccidPopupShow(true)}>
                            <img src={Info} alt="ICCID Info" />
                        </div>
                    </div>
                )}
            />
            <Input
                {...register(getFieldName('zip', parentName))}
                description={errors.zip?.message}
                isInvalid={!!errors.zip}
                containerClass="user-info-form__input"
                placeholder="Enter Zip"
                type="text"
                label="Zip"
            />

            {iccidPopupShow && (
                <Popup close={() => setIccidPopupShow(false)}>
                    <div className="popup-activate__sim-tip">
                        <div>
                            <img
                                src={SimExample}
                                className="popup-activate__sim-image"
                                style={{
                                    width: '400px',
                                }}
                            />
                        </div>
                        <div className="popup-activate__sim-tip-text">
                            Please enter the first 19 numbers on your Sim Card
                        </div>
                    </div>
                </Popup>
            )}
        </div>
    );
}
