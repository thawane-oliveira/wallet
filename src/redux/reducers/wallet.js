import { ERROR, REQUEST, SAVE_QUOTATION, SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
  // isLoading: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
    };
  case SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.info),
    };
  case ERROR:
    return {
      ...state,
      currencies: action.error,
    };
  case SAVE_QUOTATION:
    return {
      ...state,
      expenses: [...state.expenses, action.info],
    };
  // case TOTALSUM:
  //   return {
  //     ...state,
  //     total: action.sum,
  //   };
  default:
    return state;
  }
};

export default wallet;
