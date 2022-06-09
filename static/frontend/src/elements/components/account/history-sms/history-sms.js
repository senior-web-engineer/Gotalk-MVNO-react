import './history-sms.scss';
import HistoryTable from '../../ui-component/history-table/history-table';
import HistoryTableRow from '../../ui-component/history-table/history-table-row/history-table-row';
import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from "react-router-dom";
import useMediaBelow from "../../../../shared/hooks/useMediaBelow";
import {getSmsHistory} from "../../../../redux/workers/account";
import Spinner from "../../ui-component/spinner/spinner";

const WINDOW_INNER_WIDTH = 1300;

export default function HistorySms() {

    const isCompact = useMediaBelow(WINDOW_INNER_WIDTH);
    const { search } = useLocation();
    const id = useMemo(() => {
        const query = new URLSearchParams(search);
        return query.get('id') || 0;
    }, [search]);

    const [loading, setLoading] = useState();
    const [data, setData] = useState([]);
    const [maxCount, setMaxCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(id > 0) {
            getDatas(1);
        }
    }, [id]);

    function getDatas(page) {
        setLoading(true);
        setCurrentPage(page);
        getSmsHistory(id, 10, page).then(res => {
            setLoading(false);
            setData(res.data?.items || []);
            setMaxCount(res.data?.maxCount || 0);
        }, err => {
            setLoading(false);
        });
    }

    return (
        <div className="history-sms">
            <h3 className="history-sms__title">SMS History</h3>
            {loading && (
                <div style={{textAlign: 'center'}}><Spinner /></div>
            )}
            {!loading && (
                <HistoryTable
                    head={['Date & Time', 'Number', 'Quantity']}
                    compactHead={['Number & Date', 'Quantity']}
                    isCompact={isCompact}
                    paginate={true}
                    maxCount={maxCount}
                    currentPage={currentPage}
                    onPageChange={getDatas}
                >
                    {data.map((item, index) => (
                        <HistoryTableRow key={index} item={item} compact={isCompact} type="sms" />
                    ))}
                </HistoryTable>
            )}
        </div>
    );
}
