import actionsType from '../../../redux/workers/main-page/actions-type';
import Switch from '../ui-component/switch/switch';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './up-header.scss';
import { useDispatch, useSelector } from 'react-redux';

const UpHeader = ({ addClass }) => {
  const isModeBusiness = useSelector((state) => state.mainReducer.isModeBusiness);
  const consumerButton = classNames('up-header_item', { active: !isModeBusiness });
  const businessButton = classNames('up-header_item', { active: isModeBusiness });
  const dispatch = useDispatch();

  const handleConsumerButton = () => {
    dispatch({ type: actionsType.CHANGE_MODE, payload: false });
  };

  const handleBusinessButton = () => {
    dispatch({ type: actionsType.CHANGE_MODE, payload: true });
  };

  const handleSwitch = (isChecked) => {
    dispatch({ type: actionsType.CHANGE_MODE, payload: isChecked });
  };

  return (
    <div className={`up-header ${addClass}`}>
      <div className="up-header-block">
        <button onClick={handleConsumerButton} type="button" className={consumerButton}>
          Consumer
        </button>
        <Switch isChecked={isModeBusiness} addClass="up-header-modal" onChange={handleSwitch} />
        <button onClick={handleBusinessButton} type="button" className={businessButton}>
          Business
        </button>
      </div>
    </div>
  );
};

UpHeader.defaultProps = {
  addClass: '',
};

UpHeader.propTypes = {
  addClass: PropTypes.string,
};

export default UpHeader;
