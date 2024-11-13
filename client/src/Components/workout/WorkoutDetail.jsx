import React from 'react';
import PropTypes from 'prop-types';

const WorkoutDetail = ({ workout }) => {
  if (!workout) return <div style={{color:'white'}}>No workout details available.</div>;

  const { workoutName = 'No Name', workoutType = 'Unknown' } = workout;

  return (
    <div className="card" style={{ backgroundColor: '#fd7e14', color: 'white', width:'50%'}}>
      <div className="card-body">
        <h5 className="card-title">{workoutName}</h5>
        <p className="card-text">Type: {workoutType}</p>
      </div>
    </div>
  );
};
 
WorkoutDetail.propTypes = {
  workout: PropTypes.shape({
    workoutName: PropTypes.string,
    workoutType: PropTypes.string,
    // Add other expected properties here
  }),
};

export default WorkoutDetail;
