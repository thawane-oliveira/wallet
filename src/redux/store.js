import { composeWithDevTools } from '@redux-devtools/extension';
import { legacy_createStore as createStore } from 'redux';
// import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
