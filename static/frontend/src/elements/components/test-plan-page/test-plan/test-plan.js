import main from '../../../../assets/images/main-page/linxdot.png';
import mainMini from '../../../../assets/images/main-page/linxdot.png';
import PresentBlock from '../../ui-component/present-block/present-block';
import React, {useState} from 'react';
import './test-plan.scss';
import {useDispatch} from "react-redux";
import {addToBasket, getBasketItems} from "../../../../shared/basketActions";
import basketTypes from "../../../../redux/workers/basket/basket-types";
import BasketSuccessPopup from "../../ui-component/basket-success-popup/basket-success-popup";

const TestPlan = () => {

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
    <section className="test-plan">
        {showPopup && (
            <BasketSuccessPopup
                close={() => setShowPopup(false)}
                onContinue={() => setShowPopup(false)}
            />
        )}
      <div>
        <PresentBlock imgFon={main} imgMini={mainMini} imageClass="linxdot-plan-image">
          {/* <NavigationBack to={routes.home} className="test-back" /> */}

            <div className="test-plan-information">
              <h1 className="test-plan-information__title font-raleway-extra-bold">
                <b>Your Own Private <br/>4G/5G Wireless Network <br/></b><br/>
                <span className="test-plan-information__description font-raleway-bold">Bridged with GoTalk's<br/></span>
                <span className="test-plan-information__description font-raleway-bold color-red">Secure National Coverage<br/></span>
              </h1>
              
            </div>
            {/* <Button onClick={() => handleAddition()} title="Buy Now" addClass="button" /> */}
        </PresentBlock>
      </div>
    </section>
  );
};

export default TestPlan;
