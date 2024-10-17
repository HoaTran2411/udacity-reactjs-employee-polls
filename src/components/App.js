import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import PollList from './PollList';
import AddPoll from './AddPoll';
import Login from './Login';
import NotFound  from './NotFound ';
import ProtectedRoute from './ProtectedRoute';
import Leaderboard from './Leaderboard';
import PollDetail from './PollDetail';
import '../App.css';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<ProtectedRoute> <PollList /> </ProtectedRoute>} />
          <Route exact path="/add" element={<ProtectedRoute> <AddPoll /> </ProtectedRoute>} />
          <Route exact path="/leaderboard" element={<ProtectedRoute> <Leaderboard /> </ProtectedRoute>} />
          <Route path="/questions/:question_id" element={<ProtectedRoute> <PollDetail /> </ProtectedRoute>} />
          <Route exact path="/home" element={<ProtectedRoute> <Navbar /> </ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>

  );
};

export default App;