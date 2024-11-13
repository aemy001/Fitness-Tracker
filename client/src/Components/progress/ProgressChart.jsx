import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressChart = () => {

  const data = [
    { week: 'Week 1', weight: 180 },
    { week: 'Week 2', weight: 178 },
    { week: 'Week 3', weight: 176 },
    { week: 'Week 4', weight: 175 },
    { week: 'Week 5', weight: 173 },
    { week: 'Week 6', weight: 171 },
  ];

  return (
    <div className="container mt-4">
      <h4>Progress Chart</h4>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#fd7e14" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
