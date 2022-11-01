export const SUBMIT_INFO = 'SUBMIT_INFO';

export const submitInfo = (receivedInfo) => ({
  type: SUBMIT_INFO,
  email: receivedInfo.email,
});

//

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const request = () => (
  { type: 'REQUEST' }
);

export const success = (info) => (
  { type: 'SUCCESS',
    info }
);

export const fail = (error) => (
  { type: 'ERROR',
    error }
);

export const coinArray = () => async (dispatch) => {
  try {
    dispatch(request());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    // consultado método delete em: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
    dispatch(success(data));
  } catch (error) {
    dispatch(fail(error));
  }
};
