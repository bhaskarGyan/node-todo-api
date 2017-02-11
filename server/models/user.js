/**
 * Created by bhaskar on 11/02/17.
 */
const mongoose = require('mongoose');

let User = mongoose.model('User', {
    email: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },
    name: {
        type: String,
        minlength: 2,
        default: 'Bgv',
        require: true
    }
});

module.exports = {User};