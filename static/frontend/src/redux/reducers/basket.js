import basketTypes from '../workers/basket/basket-types';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  totalLines: 0,
  hasDelivery: false,
};

const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case basketTypes.BASKET_UPDATE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default basketReducer;
