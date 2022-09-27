/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React from 'react';
import './cards-plan.scss';

const CardsItem = ({ title, value }) => (
  <section className="cards-item">
    <div className="cards-item-paragraph__grid">
      <h3 className="cards-plan__head-three p-5">{title}</h3>
    </div>
    <div className="cards-item-paragraph">
      {title === 'Internet' && <span className="cards-item-paragraph__value">{value} GB</span>}
      {title === 'Calls' && (
        <span className="cards-item-paragraph__value">
          {value === 'unlimited' ? (
            <span className="infinity-symbol">Unlimited</span>
          ) : (
            `${value} min`
          )}
        </span>
      )}
      {title === 'SMS' && (
        <span className="cards-item-paragraph__value">
          {value === 'unlimited' ? (
            <span className="infinity-symbol">Unlimited</span>
          ) : (
            `${value} SMS`
          )}
        </span>
      )}
    </div>
  </section>
);

CardsItem.defaultProps = {
  title: '',
  description: '',
  descriptionTwo: '',
  descriptionThree: '',
  value: '0',
};

CardsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  descriptionTwo: PropTypes.string,
  descriptionThree: PropTypes.string,
  value: PropTypes.any,
};

export default CardsItem;
