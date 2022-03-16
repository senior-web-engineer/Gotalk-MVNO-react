import './history-table-row.scss';
import GreenArrow from '../../../../../assets/images/icons/arrow-green.svg';
import RedArrow from '../../../../../assets/images/icons/arrow-red.svg';
import PropTypes from 'prop-types';
import React from 'react';

const HistoryTableRow = ({ item, type, compact }) => (compact
  ? (
    <tr className="history-table-row--compact">
      {type === 'payment' && <td className="history-table-row__col--compact">{`${item.date} at ${item.time}`}</td>}
      {item.date && item.number && type !== 'payment' && (
        <td className="history-table-row__col--compact">
          {type === 'call' && (
            <>
              {!item.missed && <img className="history-table-row__call-icon" alt="Green arrow" src={GreenArrow} />}
              {item.missed && <img className="history-table-row__call-icon" alt="Green arrow" src={RedArrow} />}
            </>
          )}
          {item.number}
          <br />
          {item.date}
        </td>
      )}
      {item.sum && item.quantity && (
      <td className="history-table-row__col--compact">
        {`$${item.sum}`}
        <br />
        {`${item.quantity} SMS`}
      </td>
      )}
      {item.sum && item.talkTime && (
      <td className="history-table-row__col--compact">
        {`$${item.sum}`}
        <br />
        {item.talkTime}
      </td>
      )}
      {item.date && !item.number && type !== 'payment' && (<td className="history-table-row__col--compact">{item.date}</td>)}
      {item.sum && !item.quantity && !item.talkTime && (<td className="history-table-row__col--compact">{`$${item.sum}`}</td>)}
    </tr>
  )
  : (
    <tr className="history-table-row">
      {item.date && <td className="history-table-row__col">{item.date}</td>}
      {item.time && <td className="history-table-row__col">{item.time}</td>}
      {type === 'call' && (
      <td className="history-table-row__col">
        {!item.missed && <img className="history-table-row__call-icon" alt="Green arrow" src={GreenArrow} />}
        {item.missed && <img className="history-table-row__call-icon" alt="Green arrow" src={RedArrow} />}
        {item.number}
      </td>
      )}
      {type !== 'call' && type !== 'payment' && <td className="history-table-row__col">{item.number}</td>}
      {item.talkTime && <td className="history-table-row__col">{item.talkTime}</td>}
      {item.quantity && <td className="history-table-row__col">{`${item.quantity} SMS`}</td>}
      {item.sum && <td className="history-table-row__col">{`$${item.sum}`}</td>}
    </tr>
  ));

HistoryTableRow.defaultProps = {
  type: '',
  item: {
    missed: false,
    date: '',
    time: '',
    number: '',
    talkTime: '',
    sum: '',
    quantity: '',
  },
};

HistoryTableRow.propTypes = {
  item: PropTypes.object,
  compact: PropTypes.bool,
  type: PropTypes.string,
};

export default HistoryTableRow;
