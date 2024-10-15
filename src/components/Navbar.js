import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthedUser } from '../actions/users';

const Navbar = () => {
  const dispatch = useDispatch();

  const authedUser = useSelector((state) => state.users.authedUser);
  const handleLogout = () => {
    dispatch(setAuthedUser(null));
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">Add Poll</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        {authedUser ? (
          <li>
            <Link onClick={() => handleLogout()}>{authedUser} (Logout)</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;