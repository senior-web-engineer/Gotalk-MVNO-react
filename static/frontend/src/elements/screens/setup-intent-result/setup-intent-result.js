import {useNavigate, useLocation} from "react-router-dom";
import {useEffect} from "react";
import Spinner from "../../components/ui-component/spinner/spinner";
import {getSetupIntentResult} from "../../../redux/workers/account";
import {toast} from "react-toastify";
import routes from '../../../navigation/routes';
import './setup-intent-result.scss';

export default function SetupIntentResult() {

    const { search } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        handleInitial();
    }, []);

    async function handleInitial() {
        const query = new URLSearchParams(search);
        let status;
        let errorMessage = "";

        if(!query.get('setup_intent_client_secret') || !query.get('setup_intent')) {
            status = 'fail';
            errorMessage = "Invalid request!";
        }

        if(query.get('redirect_status') !== 'succeeded') {
            status = 'fail';
            errorMessage = "Payment method couldn't be saved!";
        }

        if(status !== 'fail') {
            const setupIntentStatus = await getSetupIntentResult(query.get('setup_intent'));
            switch (setupIntentStatus.data.status) {
                case "succeeded":
                    status = 'success';
                    break;
                case "processing":
                    status = 'processing';
                    break;
                case "requires_payment_method":
                    status = 'fail';
                    errorMessage = "Payment method couldn't be saved!";
                    break;
                default:
                    status = 'fail';
                    errorMessage = "Something went wrong!";
                    break;
            }
        }

        switch (status) {
            case 'success':
                toast.success('Payment method saved successfully', {
                    position: "top-right"
                });
                break;

            case 'fail':
                toast.error(errorMessage, {
                    position: "top-right"
                });
                break;

            case 'processing':
                toast.warn('Payment method save processing', {
                    position: "top-right"
                });
                break;
        }

        navigate(routes.account.history.payment);
    }

    return (
        <Spinner addClass="sir--spinner"/>
    );
}
