import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear the auth token from context and/or local storage
    toast.success('Logged out successfully');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
      <button onClick={handleLogout} className="btn btn-primary">
        Confirm Logout
      </button>
      <ToastContainer />
    </div>
  );
};

export default Logout;
