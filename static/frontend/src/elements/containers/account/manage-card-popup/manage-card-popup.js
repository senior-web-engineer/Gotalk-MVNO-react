import './manage-card-popup.scss';
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import Popup from "../../../components/ui-component/popup/popup";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {createSetupIntent} from "../../../../redux/workers/account";
import Spinner from "../../../components/ui-component/spinner/spinner";
import ManagePaymentMethodElement from "../manage-payment-method-element/manage-payment-method-element";

const reactAppStripeKey = process.env.REACT_APP_STRIPE_PK || '';
const stripePromise = loadStripe(reactAppStripeKey);

function ManageCardPopup(props, ref) {

    const [show, setShow] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(show) {
            setLoading(true);
            createSetupIntent().then(res => {
                setClientSecret(res.data.clientSecret);
                setLoading(false);
            });
        }
    }, [show]);

    useImperativeHandle(ref, () => ({
        showPopup() {
            setShow(true);
        }
    }))

    if(!show) {
        return null;
    }

    return (
        <Popup addClass="mcp--popup" close={() => setShow(false)}>
            <div className="mcp--title">
                Manage Payment Method
            </div>
            <div className="mcp--container">
                {loading && <Spinner />}
                {clientSecret && (
                    <Elements stripe={stripePromise} options={{clientSecret}}>
                        <ManagePaymentMethodElement />
                    </Elements>
                )}
            </div>
        </Popup>
    );
}

export default forwardRef(ManageCardPopup);
