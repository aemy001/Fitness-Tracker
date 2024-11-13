import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

function Workoutlist() {
  const [selectedDate, setDate] = useState(null);
  const [userWorkoutList, setUserWorkoutList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");

  async function getUserData() {
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }
  
    const decodedToken = jwtDecode(token);
    setLoading(true);
    setError(null);
    setUserWorkoutList([]);
  
    try {
      const response = await fetch(`http://localhost:5000/FitnessTracker/workouts/user/${decodedToken.userId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const workouts = await response.json();
      console.log('Fetched Workouts:', workouts);
  
      const formattedSelectedDate = selectedDate.toISOString().split('T')[0];
      console.log('Formatted Selected Date:', formattedSelectedDate);
  
      const filteringData = workouts.filter(workout => {
        const workoutDate = new Date(workout.createdAt);
        workoutDate.setHours(0, 0, 0, 0); 
      
        const selectedDateNormalized = new Date(selectedDate);
        selectedDateNormalized.setHours(0, 0, 0, 0); 
      
        console.log('Comparing:', workoutDate.toISOString().split('T')[0], 'to', selectedDateNormalized.toISOString().split('T')[0]);
        return workoutDate.getTime() === selectedDateNormalized.getTime(); 
      });
      
  
      console.log('Filtered Workouts:', filteringData);
      setUserWorkoutList(filteringData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="container" style={{ width: '70%' }}>
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4>Today's Workouts</h4>
        </div>
        <div className="card-body">
          <div className="text-center mb-3 ">
            <p>Select Date</p>
            <DatePicker
              selected={selectedDate}
              onChange={date => setDate(date)}
              customInput={<CustomInput />}
              dateFormat="yyyy-MM-dd"
            />
            <br />
            <button onClick={getUserData}  className="btn w-100" style={{ backgroundColor: '#e85c53', color:'white'}} disabled={loading}>
              {loading ? 'Loading...' : 'Fetch Workouts'}
            </button>
            {error && <div className="text-danger">{error}</div>}
          </div>

          {userWorkoutList.length > 0 ? (
            <ul className="list-group">
              {userWorkoutList.map(workout => (
                <li key={workout._id} className="list-group-item">
                  {workout.name} - {new Date(workout.createdAt).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p>No workouts found for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function CustomInput({ value, onClick }) {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={value}
        onClick={onClick}
        readOnly
      />
      <div className="input-group-append">
        <span className="input-group-text">
          <FaCalendarAlt />
        </span>
      </div>
    </div>
  );
}

export default Workoutlist;