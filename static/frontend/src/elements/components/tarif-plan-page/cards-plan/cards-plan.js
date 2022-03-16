import CardsItem from './card-item';
import basketTypes from '../../../../redux/workers/basket/basket-types';
import { addToBasket, getBasketItems } from '../../../../shared/basketActions';
import BasketSuccessPopup from '../../ui-component/basket-success-popup/basket-success-popup';
import Button from '../../ui-component/button/button';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './cards-plan.scss';

const CardsPlan = () => {
  const [showPopup, setShowPopup] = useState(false);
  const currentPlan = useSelector((store) => store.mainReducer.currentPlan);
  const dispatch = useDispatch();

  const handleAddition = () => {
    setShowPopup(true);
    addToBasket(currentPlan.id);
    dispatch({
      type: basketTypes.BASKET_UPDATE,
      payload: { totalCount: getBasketItems().length },
    });
  };

  return (
    <section className="cards-plan">
      {showPopup && (
        <BasketSuccessPopup
          close={() => setShowPopup(false)}
          onContinue={() => setShowPopup(false)}
        />
      )}
      <h2 className="cards-plan__head-two">The Monthly fee includes</h2>
      <div className="cards-plan-block">
        <CardsItem
          title="Internet"
          description="Internet package"
          descriptionTwo="Free traffic of social networks, WhatsApp"
          descriptionThree="These conditions are saved when traveling in USA"
          value={currentPlan.internetCount}
        />
        <CardsItem
          title="Calls"
          description="Unlimited calls"
          descriptionTwo="To other mobile numbers in the home region"
          descriptionThree="On trips across USA"
          value={currentPlan.minuteCount}
        />
        <CardsItem
          title="SMS"
          description="To other mobile numbers"
          descriptionTwo="To other mobile numbers in the home region"
          descriptionThree="On trips across USA"
          value={currentPlan.SMSCount}
        />
      </div>
      <Button title="BUY" addClass="plan-buy" onClick={handleAddition} />
    </section>
  );
};

export default CardsPlan;
