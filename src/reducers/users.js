import { RECEIVE_USERS, SET_AUTHED_USER, ADD_USER_QUESTION, ADD_USER_ANSWER } from '../actions/users';

const initialState = {
  authedUser: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case SET_AUTHED_USER:
      return {
        ...state,
        authedUser: action.userId,
      };
    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          questions: state[action.userId].questions.concat([action.questionId])
        }
      };
    case ADD_USER_ANSWER:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          answers: { ...state[action.userId].answers, ...action.answer }
        }
      };
    default:
      return state;
  }
};

export default users;