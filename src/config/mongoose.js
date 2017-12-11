const mongoose = require('mongoose');
const { database } = require('./index');
mongoose.Promise = global.Promise;
const url = `mongodb://${database.host}:${database.port}/${database.db}`
mongoose.connect(url, { useMongoClient: true });
const db = mongoose.connection;

// mongoose.set('debug', true);
db.on('error', console.error.bind(console, '# Mongo DB: connection error:'));

db.once('open', function() {
    console.log("Mongoose connected!");
})

module.exports = db;
