export const STORE_USER_DRAFT = 'STORE_USER_DRAFT';
export const RECEIVE_USER_DRAFT = 'RECEIVE_USER_DRAFT';
export const SYNC_USER_DRAFT = 'SYNC_USER_DRAFT';

export const receiveUserDraft = (payload) => {
  return { type: RECEIVE_USER_DRAFT, payload };
};

export const storeUserDraft = (payload) => {
  return { type: STORE_USER_DRAFT, payload };
};

export const syncUserDraft = (payload) => {
  return { type: SYNC_USER_DRAFT, payload };
};
