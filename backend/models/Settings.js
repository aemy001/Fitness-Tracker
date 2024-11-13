const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notificationPreferences: {
    workoutReminders: {
      type: Boolean,
      default: true
    },
    mealReminders: {
      type: Boolean,
      default: true
    },
    goalAlerts: {
      type: Boolean,
      default: true
    }
  },
  unitsOfMeasurement: {
    weight: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg'
    },
    distance: {
      type: String,
      enum: ['km', 'miles'],
      default: 'km'
    }
  },
  themePreferences: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);