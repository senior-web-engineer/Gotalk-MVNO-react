import './plan-description.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const PlanDescription = ({
  price,
  description,
  characteristics,
  containerClass,
  internet,
  minute,
  sms,
}) => {
  const container = classNames('plans-description', containerClass);

  return (
    <div className={container}>
      <p className="plans-description__price-container">
        <strong className="plans-description__price">
          $
          {price}
        </strong>
        Per month / per user
      </p>
      <p className="plans-description__description">{description}</p>
      <p className="card__conditions-plan">
        <p>
          <span className="card__conditions_item__value">{internet.value}{internet.unit}</span>
          <span className="card__conditions_item__sub">4G / 5G Data</span>
        </p>
        <p>
          <span className="card__conditions_item__value">
            {minute === '9007199254740991' ?  'Unlimited' : minute}
          </span>
          <span className="card__conditions_item__sub">
            MIN
          </span>
        </p>
        <p>
          <span className="card__conditions_item__value">
            {sms === '9007199254740991' ?  'Unlimited' : sms}
          </span>
          <span className="card__conditions_item__sub">
            SMS
          </span>
        </p>
      </p>
      <ul className="plans-description__list">
        {characteristics.info?.map((listItem) => (
          <li className="plans-description__list-item" key={listItem?.toString()}>
            {listItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

PlanDescription.defaultProps = {
  characteristics: {},
  price: 0,
  description: '',
  sms: '',
  internet: {
    value: 0,
    unit: 'GB',
  },
  minute: '',
};

PlanDescription.propTypes = {
  characteristics: PropTypes.object,
  price: PropTypes.number,
  description: PropTypes.string,
  sms: PropTypes.string,
  internet: PropTypes.object,
  minute: PropTypes.string,
};

export default PlanDescription;
