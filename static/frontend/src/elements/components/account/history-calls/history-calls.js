import './history-calls.scss';
import useMediaBelow from '../../../../shared/hooks/useMediaBelow';
import HistoryTable from '../../ui-component/history-table/history-table';
import HistoryTableRow from '../../ui-component/history-table/history-table-row/history-table-row';
import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from "react-router-dom";
import {getCallHistory} from "../../../../redux/workers/account";
import Spinner from "../../ui-component/spinner/spinner";

export default function HistoryCalls() {

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
        getCallHistory(id, 10, page).then(res => {
            setData(res.data?.items || []);
            setMaxCount(res.data?.maxCount || 0);
            setLoading(false);
        }, err => {
            setLoading(false);
        });
    }

    return (
        <div className="history-calls">
            <h3 className="history-calls__title">Call History</h3>
            {loading && (
                <div style={{textAlign: 'center'}}><Spinner /></div>
            )}
            {!loading && (
                <HistoryTable
                    head={['Date & Time', 'Number', 'Duration']}
                    paginate={true}
                    maxCount={maxCount}
                    currentPage={currentPage}
                    onPageChange={getDatas}
                >
                    {data.map((item, index) => (
                        <HistoryTableRow key={index} item={item} type="call" />
                    ))}
                </HistoryTable>
            )}
        </div>
    );
}
