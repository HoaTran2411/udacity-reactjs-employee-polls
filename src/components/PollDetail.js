import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handleAnswerPoll } from '../actions/share';
import '../App.css';

const PollDetail = () => {
  const dispatch = useDispatch();
  const { id: pollId } = useParams();
  const poll = useSelector((state) => state.polls[pollId]);
  const authedUser = useSelector((state) => state.users.authedUser);
  const users = useSelector((state) => state.users);

  if (authedUser == null) {
    return (<div>Please login first</div>);
  }

  if (!poll) {
    return <div>404 Poll Not Found</div>;
  }

  // Handle number and percentage of people who voted option
  const numberVotedOption1 = poll.optionOne.votes.length;
  const numberVotedOption2 = poll.optionTwo.votes.length;
  const numberOfUsers = Object.keys(users).length - 1;
  const percentageVotedOption1 = numberVotedOption1 / numberOfUsers * 100;
  const percentageVotedOption2 = numberVotedOption2 / numberOfUsers * 100;

  let answerPoll = null;
  if (poll?.optionOne.votes.includes(authedUser)) {
    answerPoll = 'optionOne';
  } else if (poll?.optionTwo.votes.includes(authedUser)) {
    answerPoll = 'optionTwo';
  }

  const handleVote = (answer) => {
    answerPoll = answer;
    dispatch(handleAnswerPoll(pollId, answer, authedUser));
  };

  return (
    <div>
      <p>Author: {poll.author}</p>
      <img className='userImg' src={users[poll.author].avatarURL} alt='avatar' />
      <h2>Would You Rather</h2>
      <h3>{poll.optionOne.text}
        <span> ({numberVotedOption1} voted ({percentageVotedOption1}%)) </span>
        <span className="compareText">or </span>
        {poll.optionTwo.text}
        <span> ({numberVotedOption2} voted ({percentageVotedOption2}%)) </span>
      </h3>
      {!answerPoll &&
        <div>
          <button onClick={() => handleVote('optionOne')} className='btn'>
            Vote for Option One
          </button>
          <button onClick={() => handleVote('optionTwo')} className='btn'>
            Vote for Option Two </button>
        </div>
      }
      {answerPoll && <p>You voted for {answerPoll}</p>}
      {!answerPoll && <p>You not yet voted, please vote!</p>}
    </div >
  );
};

export default PollDetail;