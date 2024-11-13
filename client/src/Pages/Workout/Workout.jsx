import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Workout.css';
import { jwtDecode } from 'jwt-decode';

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('Strength');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.userId;
    }
    return null;
  };
  
  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/FitnessTracker/workouts/user/${userId}`);
        setWorkouts(response.data);
      } catch (error) {
        setError('Error fetching workouts.');
        console.error('Error fetching workouts:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!exerciseName || !sets || !reps) {
      setError('Please fill in all required fields.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/FitnessTracker/workouts', {
        userId,
        name: 'New Workout',
        exercises: [
          {
            exerciseName,
            sets: Number(sets),
            reps: Number(reps),
            weight: category === 'Strength' ? Number(weight) : null,
            notes,
          }
        ],
        category,
        caloriesBurned: Number(caloriesBurned), 
        date: new Date(),
      });
  
      setWorkouts([response.data, ...workouts]);
      resetForm();
  
      await logProgress(userId, Number(weight), sets, reps, category);
    } catch (error) {
      setError('Error submitting new workout.');
      console.error('Error submitting new workout:', error.response ? error.response.data : error.message);
    }
  };
  
  const logProgress = async (userId, weight, sets, reps, category) => {
    const burned = category === 'Cardio' ? reps * 10 : sets * reps * (weight || 0.5);
    const performanceMetrics = {
      runTime: category === 'Cardio' ? reps : null,
      liftingWeights: category === 'Strength' ? [{ exerciseName, weight }] : [],
    };
  
    try {
      await axios.post('http://localhost:5000/FitnessTracker/progress', {
        userId,
        weight,
        caloriesBurned: burned,
        performanceMetrics,
        logDate: new Date(),
      });
    } catch (error) {
      console.error('Error logging progress:', error.response ? error.response.data : error.message);
    }
  };

  const resetForm = () => {
    setExerciseName('');
    setSets('');
    setReps('');
    setWeight('');
    setNotes('');
    setCategory('Strength');
    setCaloriesBurned('');
    setError('');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/FitnessTracker/workouts/${id}`);
      setWorkouts(workouts.filter(workout => workout._id !== id));
    } catch (error) {
      setError('Error deleting workout.');
      console.error('Error deleting workout:', error.response ? error.response.data : error.message);
    }
  };

  const calculateCaloriesBurned = () => {
    if (!sets || !reps || (category === 'Strength' && !weight)) {
      setError('Please fill in sets, reps, and weight (if applicable).');
      return;
    }
  
    const setsNum = Number(sets);
    const repsNum = Number(reps);
    const weightNum = category === 'Strength' ? Number(weight) : 0;
  
    let burned;
    
    if (category === 'Cardio') {
      burned = repsNum * 10;
    } else if (category === 'Strength') {
      burned = setsNum * repsNum * (weightNum * 0.1); 
    } else {
      burned = setsNum * repsNum * 5; 
    }
  
    setCaloriesBurned(burned);
  };
  
  return (
    <div className="container mt-4 ">
      <div className="row">
        <div className="col-md-6">
          <h3 className='workout'>Add New Workout</h3>
          <form onSubmit={handleSubmit} className="bg-light p-4 rounded ">
            <div className="form-group mb-3">
              <label>Exercise Name</label>
              <input
                type="text"
                className="form-control"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Sets</label>
              <input
                type="number"
                className="form-control"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Reps</label>
              <input
                type="number"
                className="form-control"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                required
              />
            </div>

            {category === 'Strength' && (
              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label>Calories Burned</label>
              <input
                type="number"
                className="form-control"
                value={caloriesBurned}
                readOnly
              />
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={calculateCaloriesBurned}
                style={{backgroundColor: '#e85c53'}}
              >
                Calculate
              </button>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                className="form-control"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="Flexibility">Flexibility</option>
              </select>
            </div>
<br />
            <button type="submit" className="btn w-100" style={{ backgroundColor: '#e85c53', color:'white'}}>Add Workout</button>
            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
        </div>

        <div className="col-md-6">
          <h3 className='workout'>Workout Logs</h3>
          {loading ? (
            <p>Loading workouts...</p>
          ) : (
            <div className="row">
              {workouts.map(workout => (
                <div className="col-md-12" key={workout._id}>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title">{workout.name}</h5>
                      <p><strong>Category:</strong> {workout.category || 'N/A'}</p>
                      <ul className="list-group">
                        {workout.exercises && workout.exercises.length > 0 ? (
                          workout.exercises.map((exercise, index) => (
                            <li className="list-group-item" key={index}>
                              <h6>{exercise.exerciseName || 'N/A'}</h6>
                              <p><strong>Sets:</strong> {exercise.sets || 0}</p>
                              <p><strong>Reps:</strong> {exercise.reps || 0}</p>
                              {exercise.weight !== null && <p><strong>Weight:</strong> {exercise.weight || 0} kg</p>}
                              <p><strong>Notes:</strong> {exercise.notes || 'No notes'}</p>
                            </li>
                          ))
                        ) : (
                          <li className="list-group-item">No exercises</li>
                        )}
                      </ul>
                      <p className="card-text">Date Created: {new Date(workout.createdAt).toLocaleDateString() || 'N/A'}</p>
                      <button className="btn btn-danger" onClick={() => handleDelete(workout._id)}>Delete Workout</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;