import main from '../../../../assets/images/main-page/main.png';
import mainMini from '../../../../assets/images/main-page/mainMini.png';
import routes from '../../../../navigation/routes';
import actionsType from '../../../../redux/workers/main-page/actions-type';
import NavigationBack from '../../ui-component/navigation-back/navigation-back';
import PresentBlock from '../../ui-component/present-block/present-block';
import Spinner from '../../ui-component/spinner/spinner';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './tariff-plan.scss';
import { useParams } from 'react-router-dom';

const TariffPlan = () => {
  const { currentPlan = {}, isLoadingPlan = false } = useSelector((store) => ({
    currentPlan: store.mainReducer.currentPlan,
    isLoadingPlan: store.loadingReducer.isLoadingPlan,
  }));

  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoadingPlan) {
      if (currentPlan.id === undefined) {
        dispatch({ type: actionsType.LOAD_CURRENT_PLAN, id });
      }
    }
  }, [dispatch, currentPlan.id, id, isLoadingPlan]);

  const getCharacteristics = () => currentPlan?.props?.info?.map((characteristic) => (
    <li className="tariff-plan-information__characteristics" key={Object.keys(characteristic)}>
      {characteristic}
    </li>
  ));

  return (
    <section className="tariff-plan">
      <div>
        <PresentBlock imgFon={main} imgMini={mainMini} imageClass="tariff-plan-image">
          <NavigationBack to={routes.home} className="tariff-back" />
          {isLoadingPlan ? (
            <Spinner />
          ) : (
            <div className="tariff-plan-information">
              <h1 className="tariff-plan-information__title">{currentPlan.name}</h1>
              <p className="tariff-plan-information__description">{currentPlan.description}</p>
              <ul className="tariff-plan-information-list__characteristics">
                {getCharacteristics()}
              </ul>
              <h3 className="tariff-plan-information__price">
                {`$${currentPlan.costBuyPlan}`}
                <span className="tariff-plan-information__split-price">Per month / per user</span>
              </h3>
            </div>
          )}
        </PresentBlock>
      </div>
    </section>
  );
};

export default TariffPlan;
