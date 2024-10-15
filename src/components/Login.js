import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthedUser } from '../actions/users';
import { handleInitialData } from '../actions/share';
import { _getUsers } from '../utils/_DATA';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    _getUsers().then(setUsers);
  }, []);

  const handleLogin = () => {
    if (userId) {
      dispatch(setAuthedUser(userId));
      dispatch(handleInitialData());
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <select className='inputText' onChange={(e) => setUserId(e.target.value)} value={userId}>
        <option value="">Select User</option>
        {Object.keys(users).map((id) => (
          <option key={id} value={id}>{users[id].name}</option>
        ))}
      </select>
      <button onClick={handleLogin} className='btn'>Login now</button>
    </div>
  );
};

export default Login;