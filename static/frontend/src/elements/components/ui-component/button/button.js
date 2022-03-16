import load from '../../../../assets/images/icons/load.svg';
import PropTypes from 'prop-types';
import React from 'react';
import './button.scss';

const Button = ({
  title, addClass, isLoading, onClick, type,
}) => {
  const iconView = isLoading ? 'load-icon-view' : 'load-icon';
  return (
    <button type={type === 'submit' ? 'submit' : 'button'} onClick={onClick} className={`button-block ${addClass}`}>
      <div className="button-content">
        <img src={load} alt="load" className={iconView} />
        {title}
      </div>
    </button>
  );
};

Button.defaultProps = {
  isLoading: false,
  addClass: '',
  type: '',
  onClick: () => {},
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  addClass: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
