'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the User'
    },
    password: {
        type: String,
        required: 'Kindly enter the password of the User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: 'Kindly enter the email of the User'
    },
    status: {
        type: [{
            type: String,
            enum: ['admin', 'user', 'seller']
        }],
        default: ['user']
    }
});

module.exports = mongoose.model('Users', UserSchema);