'use strict';

exports.connect = {
  host: 'localhost',
  port: 3000
};

exports.swaggerOptions = {
  documentationPage: true,
  swaggerUI: true,
  tags: [{
      'name': 'sum'
  },{
      'name': 'math'
  },{
      'name': 'mathematics'
  }],
  deReference: true
};

exports.secret = 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

// mongoose/mongoDB configuration
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TestingDB");
const db = mongoose.connection;
// mongoose.set('debug', true);
db.on('error', console.error.bind(console, '# Mongo DB: connection error:'));
db.once('open', function() {
    console.log("Mongoose DB open connection!");
})
