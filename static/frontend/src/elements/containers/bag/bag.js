import './bag.scss';
import routes from '../../../navigation/routes';
import actionsType from '../../../redux/workers/main-page/actions-type';
import { getBasketItems } from '../../../shared/basketActions';
import Basket from '../../components/basket/basket';
import Button from '../../components/ui-component/button/button';
import BagScreen from '../../screens/bag-screen/bag-screen';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Bag = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isBasketEmpty, setBasketEmpty] = useState(true);

  useEffect(() => {
    dispatch({ type: actionsType.LOAD_PLANS });
    const basket = getBasketItems();

    if (!basket.length) {
      setBasketEmpty(true);
    } else {
      setBasketEmpty(false);
    }
  }, [dispatch]);

  return (
    <BagScreen>
      {isBasketEmpty ? (
        <div className="bag-screen__empty">
          <h2 className="bag-screen__empty-header">Your basket is empty</h2>
          <Button onClick={() => navigate(routes.plans)} addClass="bag-screen__empty-button" title="SEE PLANS" />
        </div>
      ) : (
        <Basket isBasketEmpty={isBasketEmpty} setBasketEmpty={setBasketEmpty} />
      )}
    </BagScreen>
  );
};

Bag.propTypes = {

};

export default Bag;
