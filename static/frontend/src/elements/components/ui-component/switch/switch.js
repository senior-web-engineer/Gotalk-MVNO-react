import './switch.scss';
import PropTypes from 'prop-types';
import React from 'react';

const Switch = ({
  addClass, onChange, label, isChecked, ...props
}) => {
  const handleChange = (e) => {
    const { checked } = e.target;
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <label className={`switch ${addClass}`}>
      <p className="switch__label">{label}</p>
      <input
        checked={isChecked}
        className="switch__input"
        onChange={(e) => handleChange(e)}
        type="checkbox"
        {...props}
      />
      <span className="switch__slider" />
    </label>
  );
};

Switch.defaultProps = {
  addClass: '',
  onChange: () => {},
  label: '',
  isChecked: undefined,
};

Switch.propTypes = {
  addClass: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  isChecked: PropTypes.bool,
};

export default Switch;
