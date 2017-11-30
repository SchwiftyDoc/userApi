'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: {
        type: String,
        required: 'You need to enter an username to subscribe'
    },
    password: {
        type: String,
        required: 'You need to enter a password to subscribe'
    },
    created: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: 'You need to enter an email to subscribe'
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