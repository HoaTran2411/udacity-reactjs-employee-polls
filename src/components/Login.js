import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { setAuthedUser } from '../actions/users';
import { handleInitialData } from '../actions/share';
import { _getUsers } from '../utils/_DATA';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    _getUsers().then(setUsers);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId) {
      dispatch(setAuthedUser(userId));
      dispatch(handleInitialData());
      navigate(state?.path || "/");
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