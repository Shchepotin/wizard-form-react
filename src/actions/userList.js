export const RECEIVE_USER_LIST = 'RECEIVE_USER_LIST';
export const REQUEST_USER_LIST = 'REQUEST_USER_LIST';

export const requestUserList = (payload) => {
  return { type: REQUEST_USER_LIST, payload };
};

export const receiveUserList = (payload) => {
  return { type: RECEIVE_USER_LIST, payload };
};
