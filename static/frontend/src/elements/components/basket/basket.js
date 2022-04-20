import './basket.scss';
import routes from '../../../navigation/routes';
import basketTypes from '../../../redux/workers/basket/basket-types';
import actionsType from '../../../redux/workers/main-page/actions-type';
import paymentTypes from '../../../redux/workers/payment/payment-types';
import {
  countPrice,
  countTotalPlans,
  deleteFromBasket,
  getBasketItems,
  hasPlasticSim,
  updateBasket,
} from '../../../shared/basketActions';
import BasketItem from '../ui-component/basket-item/basket-item';
import Button from '../ui-component/button/button';
import SimsOutErrors from '../ui-component/sims-out-errors/sims-out-errors';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Basket = ({ setBasketEmpty }) => {
  const navigate = useNavigate();
  const [basketItems, setBasketItems] = useState(getBasketItems());
  const totalPrice = useSelector((state) => state.basketReducer.totalPrice);
  const totalLines = useSelector((state) => state.basketReducer.totalLines);
  const totalCount = useSelector((state) => state.basketReducer.totalCount);
  const hasDelivery = useSelector((state) => state.basketReducer.hasDelivery);
  const plans = useSelector((state) => state.mainReducer.plans);
  const { errors } = useSelector((state) => state.payment);
  const { isSignedIn, user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const handleNavigateToBillingForm = () => {
    if (isSignedIn && !hasDelivery) {
      const userInfo = {
        products: getBasketItems(),
      };

      dispatch({
        type: paymentTypes.BUY_PLAN_AUTHORIZED,
        payload: userInfo,
        navigate,
        user,
      });
      return;
    }

    navigate(routes.billingDetails, {
      state: {
        hasDelivery,
      },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch({ type: paymentTypes.RESET_PAYMENT_ERRORS });
  }, [dispatch]);

  useEffect(() => {
    if (!basketItems.length || !totalCount) {
      setBasketEmpty(true);
      dispatch({ type: basketTypes.BASKET_TOTAL_PRICE_UPDATE, payload: 0 });
    }
  }, [basketItems, setBasketEmpty, dispatch, totalCount]);

  useEffect(() => {
    if (!plans.length) {
      dispatch({ type: actionsType.LOAD_PLANS });
    }
  }, [plans, dispatch]);

  const onBasketItemChange = (data) => {
    updateBasket(data.planId, data.count, data.isEsim);
    dispatch({
      type: basketTypes.BASKET_UPDATE,
      payload: {
        totalLines: countTotalPlans(),
        totalPrice: countPrice(plans, basketItems),
        hasDelivery: Boolean(hasPlasticSim()),
      },
    });
  };

  const onBasketItemDelete = (itemId) => {
    deleteFromBasket(itemId);
    setBasketItems(getBasketItems());
    dispatch({
      type: basketTypes.BASKET_UPDATE,
      payload: {
        totalCount: getBasketItems().length,
      },
    });
  };

  const renderBasketItems = () => {
    const basketItemsObj = {};
    basketItems.forEach((item) => {
      basketItemsObj[item.planId] = item.count;
    });

    const basketItemsIds = Object.keys(basketItemsObj);
    // eslint-disable-next-line max-len
    const basketPlans = plans?.filter((plan) => basketItemsIds.indexOf(plan.id?.toString()) > -1) || [];

    basketPlans.forEach((plan) => {
      const updatedPlan = plan;
      updatedPlan.count = basketItemsObj[plan.id.toString()];
      updatedPlan.isEsim = basketItems.find((basketItem) => basketItem.planId === plan.id).isEsim;
      return updatedPlan;
    });

    return basketPlans.map((plan) => (
      <BasketItem
        item={plan}
        id={plan.id}
        key={plan.id}
        onChange={onBasketItemChange}
        onDelete={onBasketItemDelete}
        className="basket__basket-item"
      />
    ));
  };

  return (
    <div className="basket">
      <section className="basket__products">
        <h2 className="basket__title">Basket</h2>
        <SimsOutErrors errors={errors} plans={plans} />
        <div className="basket__products-container">
          <ul className="basket__products-list">
            <li className="basket__products-list-item">{renderBasketItems()}</li>
          </ul>
          <div className="basket__price-container">
            <div className="basket__price-row">
              <div className="basket__price-col">Delivery</div>
              <div className="basket__price-col sum">{hasDelivery ? 'is 2 – 3 days' : '$0'}</div>
            </div>
            <div className="basket__price-row">
              <div className="basket__price-col">Lines</div>
              <div className="basket__price-col sum">{totalLines}</div>
            </div>
            <div className="basket__price-row total">
              <div className="basket__price-col">Total</div>
              <div className="basket__price-col">{`$${totalPrice}`}</div>
            </div>
            <div className="basket__price-row taxes">
              <p className="basket__price-row__taxes-text">(Incl. all Taxes & Fees)</p>
            </div>
            <div className="basket__price-row coupon">
              <p className="basket__price-row__taxes-text">(Incl. all Taxes & Fees)</p>
            </div>
            <div className="basket__price-row policy">
              <p className="basket__price-row__policy-text">
                By placing your order, you agree to our <a href="/terms-conditions" target="_blank">Terms & Conditions</a>, <a href="/return-policy" target="_blank">Refund Policy</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>
              </p>
            </div>
            <Button
              onClick={handleNavigateToBillingForm}
              addClass="basket__button-next"
              title="NEXT"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

Basket.defaultProps = {
  setBasketEmpty: () => {},
};

Basket.propTypes = {
  setBasketEmpty: PropTypes.func,
};

export default Basket;
