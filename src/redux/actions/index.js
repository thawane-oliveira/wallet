export const SUBMIT_INFO = 'SUBMIT_INFO';

export const submitInfo = (receivedInfo) => ({
  type: SUBMIT_INFO,
  email: receivedInfo.email,
});
