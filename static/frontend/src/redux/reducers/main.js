import actionsType from '../workers/main-page/actions-type';

const initialState = {
  plans: [],
  popularPlans: [],
  currentPlan: {},
  isModeBusiness: false,
  category: 'All'
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case actionsType.GET_PLANS: {
      return {
        ...state,
        plans: [...action.payload],
      };
    }

    case actionsType.GET_CURRENT_PLAN: {
      return {
        ...state,
        currentPlan: action.payload,
      };
    }

    case actionsType.CHANGE_MODE: {
      return { ...state, isModeBusiness: action.payload };
    }

    case actionsType.SET_POPULAR_PLANS: {
      return { ...state, popularPlans: action.payload };
    }

    case actionsType.CHANGE_CATEGORY: {
      return {
        ...state,
        category: action.payload,
      };
    }

    default:
      return state;
  }
}
