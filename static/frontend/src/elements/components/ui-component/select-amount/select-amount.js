import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './select-amount.scss';

const SelectAmount = ({ addClass, array }) => {
  const [activeItem, setActiveItem] = useState(0);

  const clickNumber = (item) => {
    setActiveItem(item);
  };

  return (
    <div className={`select-amount-container ${addClass}`}>
      {array.map((item) => (
        <button
          type="button"
          key={item.toString()}
          className={
            activeItem === item
              ? 'select-amount_item select-amount_item-active'
              : 'select-amount_item'
          }
          onClick={() => clickNumber(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
SelectAmount.defaultProps = {
  addClass: '',
};

SelectAmount.propTypes = {
  addClass: PropTypes.string,
  array: PropTypes.array.isRequired,
};

export default SelectAmount;
