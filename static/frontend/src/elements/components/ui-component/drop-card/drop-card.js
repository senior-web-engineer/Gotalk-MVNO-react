import './drop-card.scss';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const DropCard = ({ children, addClass }) => {
  const [isOpenCard, setIsOpenCard] = useState(false);

  return (
    <article className={isOpenCard ? `drop-card-open ${addClass} ` : `drop-card ${addClass}`}>
      <div className="drop-card__icons">
        <button
          type="button"
          className={isOpenCard ? 'drop-card__icons-arrow isopen-card' : 'drop-card__icons-arrow'}
          onClick={() => setIsOpenCard(!isOpenCard)}
        >
          {' '}
        </button>
      </div>
      <div className={isOpenCard ? 'drop-card__text open-card-text' : 'drop-card__text'}>
          {children}
      </div>
    </article>
  );
};

DropCard.defaultProps = {
  addClass: '',
  children: React.Fragment,
};

DropCard.propTypes = {
  addClass: PropTypes.string,
  children: PropTypes.node,
};

export default DropCard;
