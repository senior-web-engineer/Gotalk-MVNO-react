import Switch from "../../../ui-component/switch/switch";
import React from "react";
import Input from "../../../ui-component/input/input";
import AccountEditSection from "../section/section";
import './block-port.scss';

export default function AccountEditBlockPort({ register, watch, setValue, errors }) {
    const doBlockPortOut = watch('doBlockPortOut', false);
    const accountNumber = watch('accountNumber', '');
    return (
        <AccountEditSection title="Port details" addClass="account-screen-block">
            <div className="account-screen-form__wrapper">
                <div className="account-screen-form__block-switch">
                    <Switch
                        isChecked={doBlockPortOut}
                        onChange={(checked) => setValue('doBlockPortOut', checked)}
                        label="Block port outs?"
                        addClass="account-screen-edit__switch"
                    />
                </div>
                <div className="account-screen-form__block-inputs">
                    <Input
                        type="text"
                        placeholder="Enter account number"
                        label="Account number"
                        containerClass="account-screen-edit__input"
                        value={accountNumber}
                        disabled
                    />
                    <Input
                        type="text"
                        placeholder="Enter pin number"
                        label="Pin number"
                        containerClass="account-screen-edit__input"
                        {...register('pinNumber')}
                    />
                </div>
            </div>
        </AccountEditSection>
    )
}
