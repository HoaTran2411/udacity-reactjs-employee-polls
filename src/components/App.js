import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import PollList from './PollList';
import AddPoll from './AddPoll';
import Login from './Login';
import Leaderboard from './Leaderboard';
import PollDetail from './PollDetail';
import '../App.css';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PollList />} />
          <Route path="/add" element={<AddPoll />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/poll/:id" element={<PollDetail />} />
          <Route path="/home" element={<Navbar />} />
        </Routes>
      </Router>
    </div>

  );
};

export default App;