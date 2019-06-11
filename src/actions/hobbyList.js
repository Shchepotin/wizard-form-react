export const REQUEST_HOBBY_LIST = 'REQUEST_HOBBY_LIST';
export const RECEIVE_HOBBY_LIST = 'RECEIVE_HOBBY_LIST';

export const requestHobbyList = (payload) => {
  return { type: REQUEST_HOBBY_LIST, payload };
};

export const receiveHobbyList = (payload) => {
  return { type: RECEIVE_HOBBY_LIST, payload };
};
