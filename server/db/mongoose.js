/**
 * Created by bhaskar on 11/02/17.
 */
const mongoose = require('mongoose');
const mongodbURI = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;

mongoose.connect(mongodbURI);

module.exports = {mongoose};