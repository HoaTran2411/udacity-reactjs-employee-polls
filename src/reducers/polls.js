import { RECEIVE_POLLS, ADD_POLL, ANSWER_POLL } from '../actions/polls';

const polls = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls,
      };
    case ADD_POLL:
      return {
        ...state,
        [action.poll.id]: action.poll,
      };
    case ANSWER_POLL:
      return {
        ...state,
        [action.pollId]: {
          ...state[action.pollId],
          [action.answer]: {
            ...state[action.pollId][action.answer],
            votes: state[action.pollId][action.answer].votes.concat([action.authedUser]),
          },
        },
      };
    default:
      return state;
  }
};

export default polls;