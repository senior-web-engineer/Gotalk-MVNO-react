import './checkout.scss';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import React, {useEffect, useState} from "react";
import routes from "../../../navigation/routes";
import Basket from "../../components/basket/basket";
import NavigationBack from "../../components/ui-component/navigation-back/navigation-back";
import {useDispatch} from "react-redux";
import paymentTypes from "../../../redux/workers/payment/payment-types";
import actionsType from "../../../redux/workers/main-page/actions-type";
import {getBasketItems} from "../../../shared/basketActions";
import Button from "../../components/ui-component/button/button";
import {useNavigate} from "react-router-dom";

const reactAppStripeKey = process.env.REACT_APP_STRIPE_PK || '';
const stripePromise = loadStripe(reactAppStripeKey);

export default function Checkout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isBasketEmpty, setBasketEmpty] = useState(true);

    useEffect(() => {
        dispatch({ type: actionsType.LOAD_PLANS });
        const basket = getBasketItems();

        if (!basket.length) {
            setBasketEmpty(true);
        } else {
            setBasketEmpty(false);
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch({
            type: paymentTypes.CHECKOUT_DATAS,
            payload: null
        });
    }, []);

    return (
        <Elements stripe={stripePromise}>
            <div className="checkout">
                <NavigationBack to={routes.home} />
                {isBasketEmpty ? (
                    <div className="bag-screen__empty">
                        <h2 className="bag-screen__empty-header">Your basket is empty</h2>
                        <Button onClick={() => navigate(routes.plans)} addClass="bag-screen__empty-button" title="SEE PLANS" />
                    </div>
                ) : (
                    <h2 className="checkout__title">Check out</h2>
                )}
                <Basket isBasketEmpty={isBasketEmpty} setBasketEmpty={setBasketEmpty} checkout={true} />
            </div>
        </Elements>
    )
}
