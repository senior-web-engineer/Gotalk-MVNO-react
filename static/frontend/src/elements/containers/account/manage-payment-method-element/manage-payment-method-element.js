import './manage-payment-method-element.scss';
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import Button from "../../../components/ui-component/button/button";
import React, {useState} from "react";
import Spinner from "../../../components/ui-component/spinner/spinner";

let paymentElementComplete = false;
export default function ManagePaymentMethodElement() {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    async function submitForm() {
        if(!paymentElementComplete) {
            const {error} = await stripe.confirmSetup({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/setup-intent-result`,
                },
            });
            return;
        }

        setLoading(true);
        const {error} = await stripe.confirmSetup({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/setup-intent-result`,
            },
        });
        if(error) {
            setLoading(false);
        }
    }

    return (
        <div className="mpme--container">
            <PaymentElement onChange={ev => paymentElementComplete = ev.complete} />
            <Button
                addClass="mpme--button"
                onClick={() => submitForm()}
                title="SUBMIT"
            />
            {loading && <Spinner addClass="mpme--spinner"/>}
        </div>
    );
}
