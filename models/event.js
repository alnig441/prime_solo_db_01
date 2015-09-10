var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var EventSchema = new Schema({
    event: String,
    date: Date,
    image: String,
    language: String
});

module.exports = mongoose.model('Event', EventSchema);