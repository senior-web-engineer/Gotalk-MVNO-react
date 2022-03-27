import Button from '../../ui-component/button/button';
import PlanDescription from '../../ui-component/plan-description/plan-description';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import './activate-card.scss';

const ActivateCard = ({
  title,
  price,
  description,
  characteristics,
  onClick,
  onClickQR,
  typeSim,
  statusActivate,
  sms,
  internet,
  minute,
  titleButton,
  titleButtonQR,
  addClass,
  userSimPort,
  onClickReSendPort
}) => {

  const isOnSimPort = useMemo(() => {
    return userSimPort?.status === 'PENDING' || userSimPort?.status === 'RESOLUTION REQUIRED';
  }, [userSimPort?.status]);

  return (
    <div className={`activate-card-block ${addClass}`}>
      <div className="activate-card-content">
        <h3 className="card-sim__title">{title}</h3>
        <PlanDescription
          description={description}
          characteristics={characteristics}
          price={price}
          sms={sms}
          internet={internet}
          minute={minute}
        />
        <p className="card-sim__type">{`SIM card type: ${typeSim}`}</p>
      </div>
      <div className="activate-card-footer">
        {statusActivate === 'not_active' ? (
          <div className="activate-card__status">Not activated</div>
        ) : (
          <div className="activate-card__status">Active</div>
        )}

        {isOnSimPort && (
          <>
            <div className="port-status">
              <span>
                PORT: {userSimPort.status} 
                {userSimPort.messageCode && (
                  <>
                    <br />
                    <small>{userSimPort.messageCode}</small>
                  </>
                )}
              </span>
              {userSimPort.status === 'RESOLUTION REQUIRED' && (
                <Button onClick={onClickReSendPort} title={"RE-SEND PORT"} addClass="port-status--button" />
              )}
            </div>
          </>
        )}
        {(!isOnSimPort && statusActivate !== 'active') && (
        <Button onClick={onClick} title={titleButton} addClass="sim-activate" />
        )}
        {(!isOnSimPort && statusActivate === 'active' && typeSim === 'esim') && (
        <Button onClick={onClickQR} title={titleButtonQR} addClass="sim-activate" />
        )}
      </div>
    </div>
  );
}

ActivateCard.defaultProps = {
  title: '',
  description: '',
  characteristics: {},
  price: 0,
  typeSim: 'Plastic',
  statusActivate: 'No Activate',
  sms: '',
  internet: {
    value: 0,
    unit: 'GB',
  },
  minute: '',
  titleButton: 'Activate SIM-card',
  titleButtonQR: 'scan qr',
  addClass: '',
  onClickQR: () => {},
  onClick: () => {},
  userSimPort: {}
};

ActivateCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  typeSim: PropTypes.string,
  statusActivate: PropTypes.string,
  titleButton: PropTypes.string,
  titleButtonQR: PropTypes.string,
  addClass: PropTypes.string,
  characteristics: PropTypes.object,
  sms: PropTypes.string,
  internet: PropTypes.object,
  minute: PropTypes.string,
  onClick: PropTypes.func,
  onClickQR: PropTypes.func,
  price: PropTypes.number,
  userSimPort: PropTypes.object,
  onClickReSendPort: PropTypes.func
};

export default ActivateCard;
