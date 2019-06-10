export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_USER = 'REQUEST_USER';
export const SAVE_USER = 'SAVE_USER';

export const requestUser = (payload) => {
  return { type: REQUEST_USER, payload };
};

export const receiveUser = (payload) => {
  return { type: RECEIVE_USER, payload };
};

export const saveUser = (payload) => {
  return { type: SAVE_USER, payload };
};
