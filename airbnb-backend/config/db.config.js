const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://nerd:nerd@cluster0-shard-00-00.fn9ul.mongodb.net:27017,cluster0-shard-00-01.fn9ul.mongodb.net:27017,cluster0-shard-00-02.fn9ul.mongodb.net:27017/?ssl=true&replicaSet=atlas-mmfk9s-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0');
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
