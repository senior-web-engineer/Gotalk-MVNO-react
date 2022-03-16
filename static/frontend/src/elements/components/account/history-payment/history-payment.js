import './history-payment.scss';
import useMediaBelow from '../../../../shared/hooks/useMediaBelow';
import HistoryTable from '../../ui-component/history-table/history-table';
import HistoryTableRow from '../../ui-component/history-table/history-table-row/history-table-row';
import React from 'react';

const WINDOW_INNER_WIDTH = 1300;

const paymentRowItem = {
  date: '10/28/2022',
  time: '7:25 p.m.',
  sum: '10',
};

const HistoryPayment = () => {
  const isCompact = useMediaBelow(WINDOW_INNER_WIDTH);

  return (
    <div className="history-payment">
      <h3 className="history-payment__title">Payment history</h3>
      <HistoryTable
        head={['Date', 'Time', 'Sum']}
        compactHead={['Date & Time', 'Sum']}
        isCompact={isCompact}
      >
        <HistoryTableRow item={paymentRowItem} compact={isCompact} type="payment" />
        <HistoryTableRow item={paymentRowItem} compact={isCompact} type="payment" />
        <HistoryTableRow item={paymentRowItem} compact={isCompact} type="payment" />
        <HistoryTableRow item={paymentRowItem} compact={isCompact} type="payment" />
      </HistoryTable>
    </div>
  );
};

export default HistoryPayment;
