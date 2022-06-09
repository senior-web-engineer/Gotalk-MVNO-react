import './history-payment.scss';
import useMediaBelow from '../../../../shared/hooks/useMediaBelow';
import HistoryTable from '../../ui-component/history-table/history-table';
import HistoryTableRow from '../../ui-component/history-table/history-table-row/history-table-row';
import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from "react-router-dom";
import {getPaymentHistory} from "../../../../redux/workers/account";
import Spinner from "../../ui-component/spinner/spinner";

const WINDOW_INNER_WIDTH = 1300;

export default function HistoryPayment() {
    const isCompact = useMediaBelow(WINDOW_INNER_WIDTH);
    const { search } = useLocation();
    const id = useMemo(() => {
        const query = new URLSearchParams(search);
        return query.get('id') || 0;
    }, [search]);

    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);
    const [maxCount, setMaxCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(id > 0) {
            getDatas(1);
        }
    }, [id]);

    function getDatas(page) {
        setLoading(true);
        setCurrentPage(page);
        getPaymentHistory(id, 10, page).then(res => {
            setData(res.data?.items || []);
            setMaxCount(res.data?.maxCount || 0);
            setLoading(false);
        }, err => {
            setLoading(false);
        });
    }

    return (
        <div className="history-payment">
            <h3 className="history-payment__title">Payment history</h3>
            {loading && (
                <div style={{textAlign: 'center'}}><Spinner /></div>
            )}
            {!loading && (
                <HistoryTable
                    head={['Date', 'Time', 'Sum']}
                    compactHead={['Date & Time', 'Sum']}
                    isCompact={isCompact}
                    paginate={true}
                    maxCount={maxCount}
                    currentPage={currentPage}
                    onPageChange={getDatas}
                >
                    {data.map((item, index) => (
                        <HistoryTableRow key={index} item={item} compact={isCompact} type="payment" />
                    ))}
                </HistoryTable>
            )}
        </div>
    );
}
