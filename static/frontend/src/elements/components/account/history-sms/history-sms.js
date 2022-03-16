import './history-sms.scss';
import useMediaBelow from '../../../../shared/hooks/useMediaBelow';
import HistoryTable from '../../ui-component/history-table/history-table';
import HistoryTableRow from '../../ui-component/history-table/history-table-row/history-table-row';
import React from 'react';

const WINDOW_INNER_WIDTH = 1300;

const smsRowItem = {
  date: '10/28/2022 at 7:25 p.m.',
  number: 'sms_medicalcenter',
  quantity: 2,
  sum: '5',
};

const HistorySms = () => {
  const isCompact = useMediaBelow(WINDOW_INNER_WIDTH);

  return (
    <div className="history-sms">
      <h3 className="history-sms__title">SMS history</h3>
      <HistoryTable
        head={['Date & Time', 'Number', 'Quantity', 'Sum']}
        compactHead={['Number & Date', 'Sum & Quantity']}
        isCompact={isCompact}
      >
        <HistoryTableRow item={smsRowItem} compact={isCompact} type="sms" />
        <HistoryTableRow item={smsRowItem} compact={isCompact} type="sms" />
        <HistoryTableRow item={smsRowItem} compact={isCompact} type="sms" />
        <HistoryTableRow item={smsRowItem} compact={isCompact} type="sms" />
      </HistoryTable>
    </div>
  );
};

export default HistorySms;
