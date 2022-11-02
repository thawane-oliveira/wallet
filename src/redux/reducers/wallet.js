import {
  EDIT, ERROR, EXCLUDE, FINISHED, REQUEST, SAVE_QUOTATION, SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
  shouldEdit: false,
  id: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return { ...state };
  case SUCCESS:
    return { ...state, currencies: Object.keys(action.info) };
  case ERROR:
    return { ...state, currencies: ['Failed to fetch'] };
  case SAVE_QUOTATION:
    return { ...state, expenses: [...state.expenses, action.info] };
  case EXCLUDE:
    return {
      ...state,
      expenses: [...state.expenses.filter((item) => item.id !== Number(action.id))],
    };
  case EDIT:
    return { ...state, id: action.id, shouldEdit: true };
  case FINISHED:
    return { ...state,
      shouldEdit: false,
      expenses: [
        ...state.expenses.map((item) => (
          item.id === action.info.id ? action.info : item
        )),
      ],
    };
  default:
    return state;
  }
};

export default wallet;
