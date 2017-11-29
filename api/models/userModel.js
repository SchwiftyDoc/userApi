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
    Created_date: {
        type: Date,
        default: Date.now
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