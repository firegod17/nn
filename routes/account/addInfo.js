const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../../model/User');
const mongoose = require('mongoose');
const express     = require ('express');
const jsonParser = express.json();

router.put('/', verify, jsonParser, function(req, res){
    var title = {
      car: req.body.car,
      km: req.body.km,
      status: "verified"
    };

    User.findByIdAndUpdate({_id: req.body.id}, title, {new: true}, function(err, user){
        if(err) return console.log(err);
        res.send(user);
    });
});

module.exports = router;
