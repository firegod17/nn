const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const mongoose = require('mongoose');
const express     = require ('express');
const jsonParser = express.json();
const UserAdv = require('../model/advertiser');
let latest = new Date();

router.post("/driver", jsonParser, function (req, res){
  var month = req.body.month;
  latest.setMonth(latest.getMonth() - month);

  User.find({"date" : {$lt: latest}}, function(err, user){
    res.send(user);
    console.log(user);
    console.log(latest);
  });
});

router.post("/driver/deleteUser", jsonParser, function (req, res){
  User.findOneAndRemove({_id: req.body._id}, function(err){
    if(err) return res.status(400).send(err);
    res.send('User: ' + req.body._id + ' was delete')
  });
});

router.post("/advertiser", jsonParser, function (req, res){
  var month = req.body.month;
  latest.setMonth(latest.getMonth() - month);
  
  UserAdv.find({"date" : {$lt: latest - newData}}, function(err, user){
    res.send(user.data);
    console.log(user);

  });
});

module.exports = router;
