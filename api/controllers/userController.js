'use strict';

const mongoose = require('mongoose'),
    user = mongoose.model('Users'),
    email = require('nodemailer');

exports.list_all_users = function(req, res) {
    user.find({}, function(err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
};

exports.create_a_user = function(req, res) {
    let new_user = new user(req.body);
    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.connect_user = function(req, res) {
    user.findOne({"username": req.body.username}, (err, user) => {
        if (err) res.send(err);

        if (!user) res.json({});
        // Test a matching password:
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) res.send(err);
            if(isMatch && user.validated) res.json(user);
            else res.json({})
        });
    });
}

exports.validate_a_user = function(req, res) {
    user.update({"_id": req.params.value, "username": req.params.name}, { $set: { validated: true} }, (err, user) => {
        if (err) res.json({'ok': 0});
        res.json(user);
    });
}

exports.read_a_user = function(req, res) {
    user.findById(req.params.userId, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_a_user = function(req, res) {
    user.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_a_user = function(req, res) {
    user.remove({
        _id: req.params.userId
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted.' });
    });
};