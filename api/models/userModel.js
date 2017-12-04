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
        index: true,
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
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, 'Please fill a valid email address.']
    },
    validated: {
        type: Boolean,
        default: false
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
}, {strict: true});

UserSchema.index({username: 1, email: 1});

UserSchema.pre('save', function (next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    console.log('debug');
    if (!user.isModified('password')) return next();
    console.log('debug');

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            console.log(err);
            return next(err);
        }


        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                console.log(err);
                return next(err);
            }

            // override the cleartext password with the hashed one
            user.password = hash;
            console.log(hash);
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        console.log(isMatch);
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Users', UserSchema);