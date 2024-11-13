const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json()); 

mongoose.connect(process.env.MONGODB_CONNECTION_STRNG, {

})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const userRoutes = require('./routes/UserRoute');
const workoutRoutes = require('./routes/WorkoutRoutes');
const nutritionRoutes = require('./routes/NutritionRoutes');
const progressRoutes = require('./routes/ProgressRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const settingsRoutes = require('./routes/settingsRoutes');
const foodItemRoutes = require('./routes/fooditemsroutes');

app.use('/FitnessTracker/foodItems', foodItemRoutes);
app.use('/FitnessTracker/users', userRoutes);
app.use('/FitnessTracker/workouts', workoutRoutes);
app.use('/FitnessTracker/nutrition', nutritionRoutes);
app.use('/FitnessTracker/progress', progressRoutes);
// app.use('/FitnessTracker/notifications', notificationRoutes);
// app.use('/FitnessTracker/reports', reportRoutes);
// app.use('/FitnessTracker/settings', settingsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});