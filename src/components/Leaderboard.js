import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css';

const Leaderboard = () => {
  const users = useSelector((state) => state.users);

  if (!users || Object.keys(users).length === 0) {
    return <div>Loading...</div>;
  }

  const leaderboard = Object.values(users).map(user => {
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      questionsAsked: user.questions?.length || 0,
      answersGiven: Object.keys(user.answers || {}).length,
      totalScore: user.questions?.length + Object.keys(user.answers || {}).length,
    };
  }).filter(user => user && user.id !== undefined);

  leaderboard.sort((a, b) => b.totalScore - a.totalScore);
  return (
    <div>
      <h1>Leader board</h1>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={index} className='userDetail'>
            <span>{index + 1}</span>
            <img className='userImg' src={user.avatarURL} alt='avatar' />
            {user.name}: {user.totalScore} (Questions: {user.questionsAsked}, Answers: {user.answersGiven})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;