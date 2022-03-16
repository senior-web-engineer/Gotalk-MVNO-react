import './header-dropdown.scss';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const HeaderDropdown = ({
  placeholder,
  onExit,
  accountPath,
  classPlaceholder,
  setIsOpenModalMenu,
}) => {
  const [isOpen, setOpen] = useState(false);
  const dropdown = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdown.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => window.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleOpening = () => {
    setOpen(!isOpen);
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    }
  };

  const handleCloseDropdown = () => {
    setOpen(false);
    setIsOpenModalMenu(false);
  };

  return (
    <div ref={dropdown} className="dropdown">
      <button
        className={`dropdown__placeholder ${classPlaceholder}`}
        onClick={handleOpening}
        type="button"
      >
        {placeholder}
      </button>
      <ul className={`dropdown__options-list ${isOpen ? '' : 'inactive'}`}>
        <li className="dropdown__option">
          <NavLink
            onClick={handleCloseDropdown}
            to={accountPath}
            className="dropdown__option-link"
            type="button"
          >
            Personal account
          </NavLink>
        </li>
        <li className="dropdown__option">
          <button onClick={handleExit} className="dropdown__option-button" type="button">
            Exit
          </button>
        </li>
      </ul>
    </div>
  );
};

HeaderDropdown.defaultProps = {
  onExit: () => {},
  accountPath: '',
  classPlaceholder: '',
  setIsOpenModalMenu: () => {},
};

HeaderDropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onExit: PropTypes.func,
  accountPath: PropTypes.string,
  classPlaceholder: PropTypes.string,
  setIsOpenModalMenu: PropTypes.func,
};

export default HeaderDropdown;
