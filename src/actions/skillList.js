export const REQUEST_SKILL_LIST = 'REQUEST_SKILL_LIST';
export const RECEIVE_SKILL_LIST = 'RECEIVE_SKILL_LIST';

export const requestSkillList = (payload) => {
  return { type: REQUEST_SKILL_LIST, payload };
};

export const receiveSkillList = (payload) => {
  return { type: RECEIVE_SKILL_LIST, payload };
};
