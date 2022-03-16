import './my-plan.scss';
import actionsTypes from '../../../../redux/workers/account/account-types';
import PlanDescription from '../../ui-component/plan-description/plan-description';
import Plans from '../../ui-component/plans/plans';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MyPlan = () => {
  const currentProduct = useSelector((state) => state.accountReducers.currentProduct);
  const products = useSelector((state) => state.accountReducers.accountProduct);
  const dispatch = useDispatch();
  const currentPlan = currentProduct.plan;

  useEffect(() => {
    if (!currentProduct?.productId && products[0]) {
      dispatch({ type: actionsTypes.LOAD_CURRENT_PRODUCT, id: products[0].userSimPlanId });
    }
  }, [currentProduct?.productId, dispatch, products]);

  return (
    <>
      <h3 className="my-plan__header">My plan</h3>
      {currentPlan && (
        <div className="my-plan__my-plan">
          <h4 className="my-plan__title">{currentPlan.name}</h4>
          <PlanDescription
            price={currentPlan.costBuyPlan}
            description={currentPlan.description}
            characteristics={Object.values(currentPlan.props || {})}
          />
        </div>
      )}
      <h3 className="my-plan__header">Plans</h3>
      <div className="my-plan__plans-container">
        <Plans wrapperClass="my-plan__plans" containerClass="my-plan__card-container" />
      </div>
    </>
  );
};

export default MyPlan;
