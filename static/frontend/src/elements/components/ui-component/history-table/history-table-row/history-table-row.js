import './history-table-row.scss';
import GreenArrow from '../../../../../assets/images/icons/arrow-green.svg';
import RedArrow from '../../../../../assets/images/icons/arrow-red.svg';
import PropTypes from 'prop-types';
import React from 'react';
import {beautifyPhoneNumber} from "../../../../../utils/utils";

export default function HistoryTableRow({item, type, compact}) {
  return (
    <>
      {compact ? (
              <tr className="history-table-row--compact">
                {type === 'payment' && <td className="history-table-row__col--compact">{`${item.date} at ${item.time}`}</td>}
                {item.date && item.phone && type !== 'payment' && (
                    <td className="history-table-row__col--compact">
                      {type === 'call' && (
                          <>
                            {!item.missed && <img className="history-table-row__call-icon" alt="Green arrow" src={GreenArrow} />}
                            {item.missed && <img className="history-table-row__call-icon" alt="Green arrow" src={RedArrow} />}
                          </>
                      )}
                      {beautifyPhoneNumber(item.phone)}
                      <br />
                      {item.date}
                    </td>
                )}
                {item.quantity && (
                    <td className="history-table-row__col--compact">
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
                {item.date && !item.phone && type !== 'payment' && (<td className="history-table-row__col--compact">{item.date}</td>)}
                {item.sum && !item.quantity && !item.talkTime && (<td className="history-table-row__col--compact">{`$${item.sum}`}</td>)}
              </tr>
          ) : (
              <tr className="history-table-row">
                {item.date && <td className="history-table-row__col">{item.date}</td>}
                {item.time && <td className="history-table-row__col">{item.time}</td>}
                {type === 'call' && (
                    <td className="history-table-row__col">
                      {!item.missed && <img className="history-table-row__call-icon" alt="Green arrow" src={GreenArrow} />}
                      {item.missed && <img className="history-table-row__call-icon" alt="Green arrow" src={RedArrow} />}
                      {beautifyPhoneNumber(item.phone)}
                    </td>
                )}
                {type !== 'call' && type !== 'payment' && <td className="history-table-row__col">{beautifyPhoneNumber(item.phone)}</td>}
                {item.talkTime && <td className="history-table-row__col">{item.talkTime}</td>}
                {item.quantity && <td className="history-table-row__col">{`${item.quantity} SMS`}</td>}
                {item.sum && <td className="history-table-row__col">{`$${item.sum}`}</td>}
              </tr>
          )}
    </>
  );
}
