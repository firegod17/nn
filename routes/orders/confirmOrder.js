const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../../model/User');
const mongoose = require('mongoose');
const express     = require ('express');
const jsonParser = express.json();
const UserAdv = require('../../model/advertiser');

router.post('/', verify, jsonParser, function(req, res){
    var title = {
      status: req.body.status,
      companyName: req.body.companyName,
      companyId: req.body.companyId
    };

    UserAdv.findById({_id: req.body.companyId}, async (err, user) => {
      if(err) return res.status(400).send(err);

      if (user.numb_cars < 1 ) return res.status(400).send("This company finished");

      UserAdv.findByIdAndUpdate({_id: req.body.companyId},
      {numb_cars: user.numb_cars - 1},
      {new: true, useFindAndModify: false},
      async (errAdv, userSec) => {
        if(errAdv) return res.status(400).send(errAdv);
      });

      User.findByIdAndUpdate({_id: req.user._id}, title, {new: true}, function(errUser, userUser){
        if(errUser) return res.status(400).send(errUser);
        console.log(userUser,user);
        res.send({userUser,user});
      });
    });
    console.log(title);
  });

  module.exports = router;
