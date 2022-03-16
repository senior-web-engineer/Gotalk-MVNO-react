import './plans.scss';
import routes from '../../../../navigation/routes';
import basketTypes from '../../../../redux/workers/basket/basket-types';
import actionsType from '../../../../redux/workers/main-page/actions-type';
import { addToBasket, getBasketItems } from '../../../../shared/basketActions';
import BasketSuccessPopup from '../basket-success-popup/basket-success-popup';
import Card from '../card/card';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Plans = ({ wrapperClass }) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const wrapper = classNames(wrapperClass, 'plans__cards');
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.mainReducer.plans);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: actionsType.LOAD_PLANS });
  }, [dispatch]);

  const clickCard = (id) => {
    dispatch({ type: actionsType.LOAD_CURRENT_PLAN, id });
    navigate(`${routes.tariff}/${id}`);
  };

  const handleBasketAddition = (id) => {
    if (id) {
      addToBasket(id);
      setShowSuccessPopup(true);
      dispatch({
        type: basketTypes.BASKET_UPDATE,
        payload: { totalCount: getBasketItems().length },
      });
    }
  };

  const renderCards = () => plans?.map((plan) => (
    <Card
      key={plan?.id}
      title={plan?.name}
      price={plan?.costBuyPlan}
      description={plan?.description}
      characteristics={plan?.props?.info}
      isCompany={plan?.isCompany}
      internet={plan?.internetCount}
      minute={plan?.minuteCount}
      sms={plan?.SMSCount}
      clickCard={() => clickCard(plan?.id)}
      onClick={(e) => {
        e.stopPropagation();
        handleBasketAddition(plan?.id);
      }}
    />
  ));

  return (
    <>
      {showSuccessPopup && (
        <BasketSuccessPopup
          close={() => setShowSuccessPopup(false)}
          onContinue={() => {
            setShowSuccessPopup(false);
          }}
        />
      )}
      <div className={wrapper}>{renderCards()}</div>
    </>
  );
};

export default Plans;
