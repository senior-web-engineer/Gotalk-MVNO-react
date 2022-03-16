import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './spinner.scss';

const Spinner = ({ addClass }) => {
  const classes = classNames('spinner-wrapper', addClass);

  return (
    <div className={classes}>
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

Spinner.propTypes = {
  addClass: PropTypes.string,
};

export default Spinner;
