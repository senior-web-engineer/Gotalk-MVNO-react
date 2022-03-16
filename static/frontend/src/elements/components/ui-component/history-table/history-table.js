import './history-table.scss';
import PropTypes from 'prop-types';
import React from 'react';

const HistoryTable = ({
  head, compactHead, children, isCompact,
}) => (
  <div className="history-table__container">
    {isCompact
      ? (
        <table className="history-table--compact">
          <thead className="history-table__thead--compact">
            {compactHead.map((title) => <th className="history-table__th--compact">{title}</th>)}
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      ) : (
        <table className="history-table">
          <thead className="history-table__thead">
            {head.map((title) => <th className="history-table__th">{title}</th>)}
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      )}
  </div>
);

HistoryTable.defaultProps = {
  head: ['Date & Time', 'Number', 'Talk time', 'Sum'],
  compactHead: ['Number & Date', 'Sum & Time'],
};

HistoryTable.propTypes = {
  head: PropTypes.array,
  children: PropTypes.node,
  compactHead: PropTypes.array,
  isCompact: PropTypes.bool,
};

export default HistoryTable;
