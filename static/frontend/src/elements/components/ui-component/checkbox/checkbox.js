import './checkbox.scss';
import useClassnames from '../../../../shared/hooks/useClassnames';
import React, { forwardRef } from 'react';

const Checkbox = ({
  addClass, onChange, label, disabled, ...props
}, ref) => {
  const labelClass = useClassnames('checkbox', addClass);

  return (
    <label className={labelClass}>
      <p className="checkbox__label">{label}</p>
      <input
        disabled={disabled}
        type="checkbox"
        className="checkbox__input"
        onChange={(event) => onChange(event)}
        value="checkbox"
        ref={ref}
        {...props}
      />
      <span className="checkbox__checkmark" />
    </label>
  );
};

export default forwardRef(Checkbox);
