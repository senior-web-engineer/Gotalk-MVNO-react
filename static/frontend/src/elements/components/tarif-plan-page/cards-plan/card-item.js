/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React from 'react';
import './cards-plan.scss';

const CardsItem = ({ title, description, descriptionTwo, descriptionThree, value }) => (
  <section className="cards-item">
    <h3 className="cards-plan__head-three">{title}</h3>
    <div className="cards-item-paragraph">
      {title === 'Internet' && (
        <span className="cards-item-paragraph__value">
          {value?.value} {value?.unit}
        </span>
      )}
    {title === 'Calls' && (
        <span className="cards-item-paragraph__value">
      {value === '9007199254740991' ? (
          <span className="infinity-symbol">∞</span>
      ) : (
          `${value} min`
      )}
    </span>
    )}
        {title === 'SMS' && (
            <span className="cards-item-paragraph__value">
          {value === '9007199254740991' ? (
              <span className="infinity-symbol">∞</span>
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
