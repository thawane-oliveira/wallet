import { ERROR, REQUEST, SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
  default:
    return state;
  }
};

export default wallet;
