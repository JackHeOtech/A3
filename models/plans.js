const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    workout: {type: String, required: true},
    duration: {type: Number, required: true},
    dayOfCompletion: {type: Date, required: true},
});

module.exports = mongoose.model('plans', planSchema);