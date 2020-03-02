const router = require('express').Router();
const User = require('../../model/User');
const UserAdv = require('../../model/advertiser');
const Budget = require('../../model/budget');
const verify = require('../verifyToken');
const express     = require ('express');
const jsonParser = express.json();
const mongoose = require('mongoose');

router.post('/', verify, jsonParser, async(req, res) => {

  UserAdv.findByIdAndUpdate(
    {_id: req.user._id},
    {
      $inc: {wallet: req.body.money, buferMoney: req.body.money * 0.15},
      $push: {historyOfPay: {data: new Date, money: req.body.money}},
    },
    {new: true, useFindAndModify: false},
    async(err, user) => {
      if(err) return res.status(400).send(err);

      Budget.findById({_id: mongoose.mongo.ObjectId("5e552e36bae4381388aafa8e")}, async (errAdv, userSec) => {
        if(errAdv) return res.status(400).send(errAdv);
        // if (userSec==null){
        //   const budget = new Budget({
        //     totalBudget: 0,
        //     budgetAdv: 0,
        //     bufgetForDrivers: 0,
        //     profit: 0,
        //   });
        //
        //   try {
        //     const savedUser = await budget.save();
        //     res.send(savedUser);
        //   } catch (err) {
        //     res.status(400).send(err);
        //   }
        // };
        console.log(userSec);
        var title = {
          totalBudget: userSec.totalBudget + req.body.money,
          budgetAdv: userSec.budgetAdv + req.body.money,
          buferMoneyFromAdv: userSec.buferMoneyFromAdv + req.body.money * 0.15,
        };

        Budget.findByIdAndUpdate({_id: "5e552e36bae4381388aafa8e"}, title, {new: true}, function(errBudget, userBudget){
          if(errBudget) return res.status(400).send(errBudget);
          console.log(userBudget);
          res.send({userBudget,user});
        });
      });
    });
});

module.exports = router;
