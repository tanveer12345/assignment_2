const mongoose = require('mongoose');

// define a schema for the game model
// this and all other models inherit from mongoose.Schema

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: 'Please enter car model',
  },
  model: {
    type: String,
    required: 'Please enter car make',
  },
  year: {
    type: Number,
  },
});


module.exports = mongoose.model('Car', carSchema);
