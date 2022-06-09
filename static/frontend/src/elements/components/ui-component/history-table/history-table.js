import './history-table.scss';
import PropTypes from 'prop-types';
import React from 'react';
import PaginationComponent from "../pagination/pagination";

function HistoryTable({
                        head, compactHead, children, isCompact, paginate, maxCount, currentPage, onPageChange
                      }) {
    return (
        <div className="history-table__container">
            {isCompact
                ? (
                    <table className="history-table--compact">
                        <thead className="history-table__thead--compact">
                        <tr>
                            {compactHead.map((title, index) => <th key={index} className="history-table__th--compact">{title}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {children}
                        </tbody>
                    </table>
                ) : (
                    <table className="history-table">
                        <thead className="history-table__thead">
                        <tr>
                            {head.map((title, index) => <th key={index} className="history-table__th">{title}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {children}
                        </tbody>
                    </table>
                )}
            {paginate && (
                <PaginationComponent
                    itemsCount={maxCount}
                    currentPage={currentPage}
                    itemsPerPage={10}
                    setCurrentPage={page => onPageChange(page)}
                />
            )}
        </div>
    );
}

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
