import { _getQuestions } from '../utils/_DATA';

export const RECEIVE_POLLS = 'RECEIVE_POLLS';
export const ADD_POLL = 'ADD_POLL';
export const ANSWER_POLL = 'ANSWER_POLL';

export const receivePolls = (polls) => ({
  type: RECEIVE_POLLS,
  polls,
});

export const addPoll = (poll) => ({
  type: ADD_POLL,
  poll,
});

export const answerPoll = (pollId, answer, authedUser) => ({
  type: ANSWER_POLL,
  pollId,
  answer,
  authedUser,
});

export const handleReceivePolls = () => {
  return (dispatch) => {
    return _getQuestions().then((polls) => {
      dispatch(receivePolls(polls));
    });
  };
};