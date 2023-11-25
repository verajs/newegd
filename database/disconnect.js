const mongoose = require('mongoose');

// Function to close the database connection
const closeDatabaseConnection = () => {
  mongoose.disconnect()
    .then(() => console.log('Mongoose connection disconnected.'))
    .catch(err => console.error('Error disconnecting Mongoose connection:', err));
}

module.exports = closeDatabaseConnection;