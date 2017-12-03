'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'A username is required.'
    },
    password: {
        type: String,
        required: 'A password is required.'
    },
    created: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'An email address is required.',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address.']
    },
    /*birthday: {
        type: Date,
        required: 'Your birthday is required.'
    },*/
    status: {
        type: [{
            type: String,
            enum: ['admin', 'user', 'seller']
        }],
        default: ['user']
    }
});

/*UserSchema.pre('save', () => {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});*/

module.exports = mongoose.model('Users', UserSchema);