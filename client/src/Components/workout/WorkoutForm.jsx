import React, { useState } from 'react';

const WorkoutForm = ({ onUpdate }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weights, setWeights] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate({ workoutName, sets, reps, weights });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
        <div className="form-group mb-3">
          <label htmlFor="workoutName">Workout Name</label>
          <input
            type="text"
            className="form-control"
            id="workoutName"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="sets">Sets</label>
          <input
            type="number"
            className="form-control"
            id="sets"
            value={sets}
            onChange={(e) => setSets(parseInt(e.target.value, 10))}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="reps">Reps</label>
          <input
            type="number"
            className="form-control"
            id="reps"
            value={reps}
            onChange={(e) => setReps(parseInt(e.target.value, 10))}
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="weights">Weights</label>
          <input
            type="number"
            className="form-control"
            id="weights"
            value={weights}
            onChange={(e) => setWeights(parseInt(e.target.value, 10))}
            required
          />
        </div>
        <button type="submit" className="btn w-100" style={{ backgroundColor: '#e85c53', color:'white'}}>Submit</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
