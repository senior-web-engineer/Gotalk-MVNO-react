import './history-calls.scss';
import useMediaBelow from '../../../../shared/hooks/useMediaBelow';
import HistoryTable from '../../ui-component/history-table/history-table';
import HistoryTableRow from '../../ui-component/history-table/history-table-row/history-table-row';
import React from 'react';

const WINDOW_INNER_WIDTH = 1300;

const callsRowItem = {
  date: '10/28/2022 at 7:25 p.m.',
  number: '+1 888 888-88-88',
  talkTime: '00:02:43',
  sum: '10',
};

const HistoryCalls = () => {
  const isCompact = useMediaBelow(WINDOW_INNER_WIDTH);

  return (
    <div className="history-calls">
      <h3 className="history-calls__title">Call history</h3>
      <HistoryTable
        isCompact={isCompact}
        head={['Date & Time', 'Number', 'Quantity', 'Sum']}
        compactHead={['Number & Date', 'Sum & Quantity']}
      >
        <HistoryTableRow item={callsRowItem} type="call" compact={isCompact} />
        <HistoryTableRow item={{ ...callsRowItem, missed: true }} type="call" compact={isCompact} />
        <HistoryTableRow item={callsRowItem} type="call" compact={isCompact} />
        <HistoryTableRow item={{ ...callsRowItem, missed: true }} type="call" compact={isCompact} />
      </HistoryTable>
    </div>
  );
};

export default HistoryCalls;
