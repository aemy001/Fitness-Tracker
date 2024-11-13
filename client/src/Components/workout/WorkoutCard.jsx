import React from 'react';
import PropTypes from 'prop-types';

const WorkoutCard = ({ workout }) => {
  if (!workout) return <div style={{color:'white'}}>No workout available.</div>; 

  const { workoutName = 'No Name', sets = 0, reps = 0, weights = 0 } = workout;

  return (
    <div className="card" style={{ backgroundColor: '#e85c53', color: 'white', width:'50%' }}>
      <div className="card-body">
        <h5 className="card-title">{workoutName}</h5>
        <p className="card-text">Sets: {sets}</p>
        <p className="card-text">Reps: {reps}</p>
        <p className="card-text">Weights: {weights}</p>
      </div>
     <div className='card-footer'>
     <button type='button' className='btn btn-success'>Edit</button>
     <button type='button' className='btn btn-danger mx-3'>Delete</button>
     </div>
    </div>
  );
};


WorkoutCard.propTypes = {
  workout: PropTypes.shape({
    workoutName: PropTypes.string,
    sets: PropTypes.number,
    reps: PropTypes.number,
    weights: PropTypes.number,
  }),
};

export default WorkoutCard;
