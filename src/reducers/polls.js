import { RECEIVE_POLLS, ADD_POLL, ANSWER_POLL, TOGGLE_VIEW } from '../actions/polls';

const initialState = {
  showUnanswered: true,
};

const polls = (state = initialState, action) => {
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
    case TOGGLE_VIEW:
      return {
        ...state,
        showUnanswered: !state.showUnanswered,
      };
    default:
      return state;
  }
};

export default polls;