import main from '../../../../assets/images/main-page/linxdot.png';
import mainMini from '../../../../assets/images/main-page/linxdot.png';
import routes from '../../../../navigation/routes';
import NavigationBack from '../../ui-component/navigation-back/navigation-back';
import PresentBlock from '../../ui-component/present-block/present-block';
import Button from '../../ui-component/button/button';
import React, {useEffect, useState} from 'react';
import './linxdot-plan.scss';
import {useDispatch} from "react-redux";
import {addToBasket, getBasketItems} from "../../../../shared/basketActions";
import basketTypes from "../../../../redux/workers/basket/basket-types";
import BasketSuccessPopup from "../../ui-component/basket-success-popup/basket-success-popup";

const LinxdotPlan = () => {

    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();

    const handleAddition = () => {
        setShowPopup(true);
        addToBasket(8, true);
        dispatch({
            type: basketTypes.BASKET_UPDATE,
            payload: { totalCount: getBasketItems().length },
        });
    };

  return (
    <section className="linxdot-plan">
        {showPopup && (
            <BasketSuccessPopup
                close={() => setShowPopup(false)}
                onContinue={() => setShowPopup(false)}
            />
        )}
      <div>
        <PresentBlock imgFon={main} imgMini={mainMini} imageClass="linxdot-plan-image">
          {/* <NavigationBack to={routes.home} className="linxdot-back" /> */}

            <div className="linxdot-plan-information">
              <h1 className="linxdot-plan-information__title font-raleway-extra-bold">
                <b>Exclusive Offer: <br/>Free US Linxdot Helium Miner <br/></b><br/>
                <span className="linxdot-plan-information__description font-raleway-bold">When you buy 12 months of SafeSim™ Max<br/></span>
                  <br/>
              </h1>
              <p className="linxdot-plan-information__split-price font-white">
              <span>Linxdot Model US915, including: <br/> 3dbi antenna, <br/>onboarding and location fee paid
              </span>
              </p>

            </div>
            <Button onClick={() => handleAddition()} title="Buy Now" addClass="button" />
        </PresentBlock>
      </div>
    </section>
  );
};

export default LinxdotPlan;
