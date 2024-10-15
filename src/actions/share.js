import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer
} from '../utils/_DATA.js';
import { receivePolls, addPoll, answerPoll } from './polls.js';
import { receiveUsers, addUserQuestion, addUserAnswer } from './users.js';

export const getInitialdata = () => {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, polls]) => ({
        users,
        polls,
    }))
}

export const handleInitialData = () => {
    return (dispatch) => {
        return getInitialdata()
            .then(({ users, polls }) => {
                dispatch(receiveUsers(users));
                dispatch(receivePolls(polls));
            })
    }
}

export const handleAddPoll = (optionOneText, optionTwoText, author) => {
    return (dispatch) => {
        let pollId = '';
        return _saveQuestion({ optionOneText, optionTwoText, author })
            .then((poll) => {
                dispatch(addPoll(poll));
                pollId = poll.id;
                return pollId;
            })
            .then(() => dispatch(addUserQuestion(author, pollId)));;
    };
};

export const handleAnswerPoll = (pollId, answer, authedUser) => {
    return (dispatch) => {
        if (!authedUser) {
            console.error("User is not authenticated.");
            return;
        }
        return _saveQuestionAnswer({ authedUser, qid: pollId, answer })
            .then(() => {
                dispatch(answerPoll(pollId, answer, authedUser));
            })
            .then(() => {
                dispatch(addUserAnswer(authedUser, answer))
            })
            .catch((error) => {
                console.error("Error saving answer:", error);
            });
    };
};