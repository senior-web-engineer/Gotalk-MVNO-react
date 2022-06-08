import React, {useEffect, useMemo, useRef, useState} from "react";
import Spinner from "../../../components/ui-component/spinner/spinner";
import Button from "../../../components/ui-component/button/button";
import {NavLink, useLocation} from "react-router-dom";
import routes from "../../../../navigation/routes";
import ManageCardPopup from "../manage-card-popup/manage-card-popup";
import {getPaymentInformation} from "../../../../redux/workers/account";

export default function PaymentInformation() {

    const { search } = useLocation();
    const id = useMemo(() => {
        const query = new URLSearchParams(search);
        return query.get('id') || 0;
    }, [search]);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const manageCardPopupRef = useRef();

    useEffect(() => {
        const query = new URLSearchParams(search);
        if(id > 0) {
            setLoading(true);
            getPaymentInformation(id).then(res => {
                setLoading(false);
                setData(res.data);
            }, err => {
                setLoading(false);
            })
        }
    }, [search]);

    function manageCard() {
        manageCardPopupRef.current?.showPopup();
    }

    if(loading) {
        return (
            <div className="account-sidebar__spinner-container">
                <Spinner />
            </div>
        );
    }

    return (
        <>
            {(data?.simStatus === 'blocked_paid' || data?.simStatus === 'blocked') && (
                <div className="account-sidebar__item__title" style={{
                    textAlign: 'center'
                }}>
                    SIM BLOCKED
                </div>
            )}
            {(data?.simStatus === 'not_active') && (
                <div className="account-sidebar__item__title" style={{
                    textAlign: 'center'
                }}>
                    SIM NOT ACTIVE
                </div>
            )}
            {(data?.simStatus === 'active' || data?.simStatus === 'not_paid') && (
                <>
                    <div className="account-sidebar__item__title">
                        Next Payment
                        <span>${data?.nextPaymentPrice}</span>
                    </div>
                    <div className="account-sidebar__item__sub">
                        Due Date
                        <span>{data?.nextPaymentDate}</span>
                    </div>
                </>
            )}
            {data?.hasCard && (
                <div className="account-sidebar__item__card">
                    Using card ending <b className="account-sidebar__item__bold">{data?.last4}</b>
                </div>
            )}
            <Button
                addClass="account-sidebar__item__button"
                onClick={() => manageCard()}
                title={data?.hasCard ? 'Update Card' : 'Add Card'}
            />
            <div className="text-center">
                <NavLink className="account-sidebar__item__link" to={`${routes.account.history.payment}?id=${id}`}>
                    VIEW PAYMENT HISTORY
                </NavLink>
            </div>
            <ManageCardPopup ref={manageCardPopupRef} />
        </>
    );
}
