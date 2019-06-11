export const REQUEST_MAIN_LANGUAGE_LIST = 'REQUEST_MAIN_LANGUAGE_LIST';
export const RECEIVE_MAIN_LANGUAGE_LIST = 'RECEIVE_MAIN_LANGUAGE_LIST';

export const requestMainLanguageList = (payload) => {
  return { type: REQUEST_MAIN_LANGUAGE_LIST, payload };
};

export const receiveMainLanguageList = (payload) => {
  return { type: RECEIVE_MAIN_LANGUAGE_LIST, payload };
};
