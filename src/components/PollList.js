import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Poll from './Poll';
import { toggleView } from '../actions/polls'

const PollList = () => {
  const dispatch = useDispatch();
  const polls = useSelector((state) => state.polls);
  const authedUser = useSelector((state) => state.users.authedUser);
  const showUnanswered = useSelector((state) => state.polls.showUnanswered);

  const listPolls = Object.values(polls).filter(poll => poll !== showUnanswered);
  const unansweredPolls = listPolls.filter(poll =>
    !poll.optionOne.votes.includes(authedUser) && !poll.optionTwo.votes.includes(authedUser)
  ).sort((a, b) => b.timestamp - a.timestamp);

  const answeredPolls = listPolls.filter(poll =>
    poll.optionOne.votes.includes(authedUser) || poll.optionTwo.votes.includes(authedUser)
  ).sort((a, b) => b.timestamp - a.timestamp);

  const handleToggle = () => {
    dispatch(toggleView());
  };
  return (
    <div>
      <button onClick={handleToggle} className='btn'>
        {showUnanswered ? 'Show Answered Polls' : 'Show Unanswered Polls'}
      </button>
      <h2>{showUnanswered ? 'Unanswered Polls' : 'Answered Polls'}</h2>
      <ul>
        {(showUnanswered ? unansweredPolls : answeredPolls).map((poll) => (
          <Poll key={poll.id} poll={poll} />
        ))}
      </ul>
    </div>
  );
};

export default PollList;