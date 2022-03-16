/* eslint-disable jsx-a11y/no-static-element-interactions */
import './card.scss';
import Button from '../button/button';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Card = ({
  title,
  price,
  description,
  characteristics,
  onClick,
  clickCard,
  isCompany,
  sms,
  internet,
  minute,
}) => {
  const getProps = (propsObj) => Object.values(propsObj || {});
  const isModeBusiness = useSelector((state) => state.mainReducer.isModeBusiness);
  const [isCompanyMode, setIsCompanyMode] = useState(isModeBusiness);

  useEffect(() => {
    setIsCompanyMode(isModeBusiness);
  }, [isModeBusiness]);

  const getCharacteristics = () =>
    getProps(characteristics)?.map((characteristic) => (
      <li className="card__characteristics-item" key={characteristic}>
        {characteristic}
      </li>
    ));

  return (
    <div>
      {isCompanyMode === isCompany && (
        <div className="card" onClick={clickCard}>
          <div className="card__content">
            <h4 className="card__title">{title}</h4>
            <h3 className="card__total-price">{`$${price}`}</h3>
            <p className="card__split-price">Per month / per user</p>
            <p className="card__description">{description}</p>
            <p className="card__conditions">
              <p>
                <span className="card__conditions_item">{internet.value}</span> {internet.unit}
              </p>
              <p>
                <span className="card__conditions_item">
                  {minute === '9007199254740991' ? (
                    <span className="infinity-symbol">∞</span>
                  ) : (
                    `${minute}`
                  )}
                </span>{' '}
                MIN
              </p>
              <p>
                <span className="card__conditions_item">
                  {sms === '9007199254740991' ? (
                    <span className="infinity-symbol">∞</span>
                  ) : (
                    `${sms}`
                  )}
                </span>{' '}
                SMS
              </p>
            </p>
            <ul className="card__characteristics">{getCharacteristics()}</ul>
          </div>
          <Button onClick={onClick} addClass="card__button" title="BUY" />
        </div>
      )}
    </div>
  );
};

Card.defaultProps = {
  title: '',
  description: '',
  characteristics: [],
  price: 0,
  isCompany: false,
  sms: '',
  internet: {
    value: 0,
    unit: 'GB',
  },
  minute: '',
  clickCard: () => {},
  onClick: () => {},
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  characteristics: PropTypes.array,
  onClick: PropTypes.func,
  price: PropTypes.number,
  isCompany: PropTypes.bool,
  clickCard: PropTypes.func,
  sms: PropTypes.string,
  internet: PropTypes.object,
  minute: PropTypes.string,
};

export default Card;
