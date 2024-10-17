import React from 'react';
import { Link } from 'react-router-dom';

const Poll = ({ poll }) => {
  return (
    <div>
      <h3>
        <Link to={`/questions/${poll.id}`}>{poll.optionOne?.text} <span className='compareText'> vs </span> {poll.optionTwo?.text}</Link>
      </h3>
    </div>
  );
};

export default Poll;