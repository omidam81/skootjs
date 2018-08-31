const mongoose = require('mongoose');
module.exports = function() {
  var mongoDB = 'mongodb://127.0.0.1/scoot3';
  mongoose.connect(
    mongoDB,
    { useNewUrlParser: true }
  );
  // Get Mongoose to use the global promise library
  mongoose.Promise = global.Promise;
  //Get the default connection
  var db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};
