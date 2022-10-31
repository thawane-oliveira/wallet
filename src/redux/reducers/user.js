import { SUBMIT_INFO } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_INFO:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
