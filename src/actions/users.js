export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';

export const setAuthedUser = (userId) => ({
  type: SET_AUTHED_USER,
  userId,
});

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export const addUserQuestion = (userId, questionId) => {
  return {
    type: ADD_USER_QUESTION,
    userId,
    questionId,
  }
}

export const addUserAnswer = (userId, answer) => {
  return {
    type: ADD_USER_ANSWER,
    userId,
    answer,
  }
}