/**
 * Created by bhaskar on 11/02/17.
 */
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid Email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 4
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObj = user.toObject();

    return _.pick(userObj, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'gyan').toString();
    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};
let User = mongoose.model('User', UserSchema);


module.exports = {User};