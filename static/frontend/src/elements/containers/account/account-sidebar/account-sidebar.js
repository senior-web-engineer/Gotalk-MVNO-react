import './account-sidebar.scss';
import React from "react";
import PaymentInformation from "./as-payment-information";
import CallHistory from "./as-call-history";
import SmsHistory from "./as-sms-history";

export default function AccountSidebar() {

    return (
        <div className="account-sidebar">
            <div className="account-sidebar__item">
                <PaymentInformation />
            </div>
            <div className="account-sidebar__item">
                <CallHistory />
            </div>
            <div className="account-sidebar__item">
                <SmsHistory />
            </div>
        </div>
    );
}
