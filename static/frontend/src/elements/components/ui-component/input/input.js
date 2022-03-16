import './input.scss';
import { ReactComponent as CrossedEyeIcon } from '../../../../assets/images/icons/crossed-eye.svg';
import { ReactComponent as EyeIcon } from '../../../../assets/images/icons/eye.svg';
import useClassnames from '../../../../shared/hooks/useClassnames';
import React, {
  useState, useRef, forwardRef, useImperativeHandle,
} from 'react';

const Input = ({
  type,
  onChange,
  placeholder,
  label,
  description,
  disabled,
  isInvalid,
  containerClass,
  ...inputProps
}, ref) => {
  const inputRef = useRef(null);
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const descriptionClassNames = useClassnames('styled-input__description', isInvalid ? 'error' : '');
  const containerClassNames = useClassnames('styled-input', containerClass);
  const inputClassNames = useClassnames('styled-input__input', isInvalid ? 'error' : '');
  const visibilityButtonClassNames = useClassnames(
    'styled-input__toggle-visibility-button',
    isPasswordHidden ? '' : 'active',
    isInvalid ? 'error' : '',
  );

  useImperativeHandle(ref, () => inputRef.current);

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleChangeVisibility = () => {
    const input = inputRef.current;
    const inputLength = input.value.length;
    input.focus();
    input.setSelectionRange(inputLength, inputLength);

    if (isPasswordHidden) {
      input.type = 'text';
      setPasswordHidden(false);
    } else {
      input.type = type;
      setPasswordHidden(true);
    }
  };

  return (
    <div className={containerClassNames}>
      <p className="styled-input__label">{label}</p>
      <input
        style={{ paddingRight: type === 'password' ? '42px' : '18px' }}
        disabled={disabled}
        ref={inputRef}
        className={inputClassNames}
        type={type}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        {...inputProps}
      />
      {type === 'password' && (
      <button
        disabled={disabled}
        onClick={handleChangeVisibility}
        className={visibilityButtonClassNames}
        type="button"
        aria-label="Show password"
      >
        {isPasswordHidden ? <EyeIcon /> : <CrossedEyeIcon />}
      </button>
      )}
      <p className={descriptionClassNames}>{description}</p>
    </div>
  );
};

export default forwardRef(Input);
