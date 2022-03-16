import './search.scss';
import SearchIcon from '../../../../assets/images/icons/search.svg';
import useClassnames from '../../../../shared/hooks/useClassnames';
import PropTypes from 'prop-types';
import React, {
  useRef, useState,
} from 'react';

const Search = ({
  onChange, containerClass, isClosed, disabled, placeholder,
}) => {
  const containerClassName = useClassnames('search', containerClass);
  const inputClassName = useClassnames('search__input', isClosed ? 'closed' : '');
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setInputValue(value);

    if (onChange) {
      onChange(event);
    }
  };

  const handleOpening = (event) => {
    if (isClosed) {
      if (event.type === 'focus') {
        inputRef.current.classList.remove('closed');
      } else if (event.type === 'blur' && !event.target.value) {
        inputRef.current.classList.add('closed');
      }
    }
  };

  return (
    <div className={containerClassName}>
      <img className="search__icon" src={SearchIcon} alt="Search icon" />
      <input
        type="search"
        disabled={disabled}
        onFocus={(event) => handleOpening(event)}
        onBlur={(event) => handleOpening(event)}
        ref={inputRef}
        value={inputValue}
        className={inputClassName}
        placeholder={placeholder}
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
};

Search.defaultProps = {
  onChange: () => {},
  containerClass: '',
  isClosed: false,
  disabled: false,
  placeholder: 'Search for an entry',
};

Search.propTypes = {
  onChange: PropTypes.func,
  containerClass: PropTypes.string,
  isClosed: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Search;
