'use strict';

const mongoose = require('mongoose'),
    user = mongoose.model('Users');

exports.list_all_users = function(req, res) {
    user.find({}, function(err, user) {
        if (err)
            res.send(err);
        const result = {
            users: json(user)
        }
        res.json(result);
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