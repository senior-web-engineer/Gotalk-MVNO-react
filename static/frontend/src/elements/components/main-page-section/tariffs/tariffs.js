import routes from '../../../../navigation/routes';
import basketTypes from '../../../../redux/workers/basket/basket-types';
import actionsType from '../../../../redux/workers/main-page/actions-type';
import { addToBasket, getBasketItems } from '../../../../shared/basketActions';
import BasketSuccessPopup from '../../ui-component/basket-success-popup/basket-success-popup';
import Button from '../../ui-component/button/button';
import Card from '../../ui-component/card/card';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './tariffs.scss';
import { useNavigate } from 'react-router-dom';

const Tariffs = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { plans = [] } = useSelector((state) => ({
    plans: state.mainReducer.popularPlans,
  }));
  const isModeBusiness = useSelector((state) => state.mainReducer.isModeBusiness);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: actionsType.LOAD_POPULAR_PLANS, isModeBusiness });
  }, [dispatch, isModeBusiness]);

  const clickCard = (id) => {
    dispatch({ type: actionsType.LOAD_CURRENT_PLAN, id });
    navigate(`${routes.tariff}/${id}`);
  };

  const handleBasketAddition = (id) => {
    if (id) {
      addToBasket(id);
      setShowPopup(true);
      dispatch({
        type: basketTypes.BASKET_UPDATE,
        payload: { totalCount: getBasketItems().length },
      });
    }
  };

  const renderCardPlan = () => plans.map((plan) => (
    <Card
      key={plan?.id}
      title={plan?.name}
      price={plan?.costBuyPlan}
      description={plan?.description}
      characteristics={plan?.props?.info}
      isCompany={plan?.isCompany}
      clickCard={() => clickCard(plan?.id)}
      internet={plan?.internetCount}
      minute={plan?.minuteCount}
      sms={plan?.SMSCount}
      onClick={(e) => {
        e.stopPropagation();
        handleBasketAddition(plan?.id);
      }}
    />
  ));

  const handleNavigation = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    navigate(routes.plans);
  };

  return (
    <div className="tariffs-container">
      <h2 className="header-two">Popular tariffs</h2>
      <div className="tariffs__card">{renderCardPlan()}</div>
      <Button onClick={handleNavigation} title="VIEW ALL" addClass="tariffs__button" />
      {showPopup && (
        <BasketSuccessPopup
          close={() => setShowPopup(false)}
          onContinue={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Tariffs;
