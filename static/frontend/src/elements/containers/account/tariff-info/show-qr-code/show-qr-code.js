import './show-qr-code.scss';
import AccountTariffInfoPlanCard from "../../../../components/account/tariff-info/plan-card/plan-card";
import React, {useMemo, useState} from "react";
import {ReactComponent as MockQrCode} from "../../../../../assets/images/account/mock-qr-code.svg";
import Loader from '../../../../components/loader/loader';
import {getQr} from "../../../../../redux/workers/account";
import {useLocation} from "react-router-dom";
import createQueryParams from "../../../../../shared/createQueryParams";

export default function AccountTariffInfoShowQRCode() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');

    const { search } = useLocation();
    const id = useMemo(() => {
        const query = new URLSearchParams(search);
        return query.get('id') || 0;
    }, [search]);

    function renderQR() {
        if(loading) {
            return <Loader />
        }
        if(data) {
            return <img src={`data:image/png;base64,${data}`} className="account-tariff-info-show-qr-wrapper__img" />;
        }
        return <MockQrCode />;
    }

    function getData() {
        setLoading(true);
        const queryParams = createQueryParams({
            productId: id
        });
        getQr(queryParams).then(res => {
            setData(res.data?.payload || '');
            setLoading(false);
        }, err => {
            setLoading(false);
            setData('');
        });
    }

    return (
        <AccountTariffInfoPlanCard addClass="account-tariff-info-show-qr-wrapper">
            <h6 className="account-tariff-info-show-qr-wrapper__title">
                Show activation QR Code
            </h6>

            <div className="account-tariff-info-show-qr-wrapper__code">
                {renderQR()}
            </div>

            <button className="account-tariff-info-show-qr-wrapper__link-generate" onClick={getData}>
                GET ACTIVATION QR-CODE
            </button>
        </AccountTariffInfoPlanCard>
    );
}
