const mongoose = require('mongoose');
const getTrelloEnv = require('../config/getConfig.js').getTrelloEnv;
const dbUri = getTrelloEnv('MONGODB_URI');
mongoose.connect(dbUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
