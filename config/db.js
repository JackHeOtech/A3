require('dotenv').config(); //Allows me to use mongodb without revealing sensitive info along with a gitignore file

const mongoose = require('mongoose');


const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB failed to connect", err));

module.exports = mongoose;