import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleAddPoll } from '../actions/share';
import { useNavigate } from 'react-router-dom';

const AddPoll = () => {
  const authedUser = useSelector((state) => state.users.authedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddPoll(optionOneText, optionTwoText, authedUser))
      .then(() => {
        navigate('/');
      });
  };

  return (
    <div>
      <h1>Create a New Poll</h1>
      <form onSubmit={handleSubmit}>
        <div className='rowForm'>
          <label>Option One: </label>
          <input
            className='inputText'
            type="text"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
            required
          />
        </div>
        <div className='rowForm'>
          <label>Option Two: </label>
          <input
            className='inputText'
            type="text"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
            required
          />
        </div>
        <button className = 'btn' type="submit">Submit Poll</button>
      </form>
    </div>
  );
};

export default AddPoll;