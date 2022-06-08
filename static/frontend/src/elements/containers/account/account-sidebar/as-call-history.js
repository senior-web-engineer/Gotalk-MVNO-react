import React, {useEffect, useMemo, useState} from "react";
import Spinner from "../../../components/ui-component/spinner/spinner";
import {NavLink, useLocation} from "react-router-dom";
import {getCallHistory} from "../../../../redux/workers/account";
import routes from "../../../../navigation/routes";
import {beautifyPhoneNumber} from "../../../../utils/utils";

export default function CallHistory() {

    const { search } = useLocation();
    const id = useMemo(() => {
        const query = new URLSearchParams(search);
        return query.get('id') || 0;
    }, [search]);

    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        if(id > 0) {
            setLoading(true);
            getCallHistory(id, 3).then(res => {
                setLoading(false);
                setData(res.data || []);
            }, err => {
                setLoading(false);
            });
        }
    }, [search]);

    if(loading) {
        return (
            <div className="account-sidebar__spinner-container">
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <div className="account-sidebar__item__title">
                Call History
            </div>
            {data.map(item => (
                <div key={item.id} className="account-sidebar__item__history">
                    <div className="account-sidebar__item__history__date">
                        {item.date}
                        <span style={{float: 'right'}}>
                            {item.callLength}
                        </span>
                    </div>
                    <div className="account-sidebar__item__history__number">
                        {beautifyPhoneNumber(item.phone)}
                    </div>
                </div>
            ))}
            <div className="text-center">
                <NavLink className="account-sidebar__item__link" to={`${routes.account.history.calls}?id=${id}`}>
                    VIEW HISTORY
                </NavLink>
            </div>
        </>
    );
}
