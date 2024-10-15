import React from 'react';
import { useSelector } from 'react-redux';
import Poll from './Poll';

const PollList = () => {
  const polls = useSelector((state) => state.polls);
  const authedUser = useSelector((state) => state.users.authedUser);

  if (authedUser == null) {
    return (<div>Please login first</div>);
  }

  const unansweredPolls = Object.values(polls).filter(poll =>
    !poll.optionOne.votes.includes(authedUser) && !poll.optionTwo.votes.includes(authedUser)
  ).sort((a, b) => b.timestamp - a.timestamp);

  const answeredPolls = Object.values(polls).filter(poll =>
    poll.optionOne.votes.includes(authedUser) || poll.optionTwo.votes.includes(authedUser)
  ).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div>
      <h2>Unanswered Polls</h2>
      {unansweredPolls.map((poll) => (
        <Poll key={poll.id} poll={poll} />
      ))}
      <h2>Answered Polls</h2>
      {answeredPolls.map((poll) => (
        <Poll key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default PollList;