const router = require('express').Router();
const verify = require('../verifyToken');
const UserAdv = require('../../model/advertiser');
const mongoose = require('mongoose');
const express     = require ('express');
const jsonParser = express.json();

router.put('/', verify, jsonParser, function (req, res) {
  var periodOfExcebitionInDays = req.body.periodOfExcebition * 31;

  if (req.body.km <= 25){
    var km = req.body.km * 1.15;
  }else if (req.body.km <= 35) {
    var km = req.body.km * 1.1;
  }else if (req.body.km <= 45) {
    var km = req.body.km * 1.05;
  }else if (req.body.km >= 55) {
    var km = req.body.km / 1.025;
  }else if (req.body.km >= 65) {
    var km = req.body.km / 1.075;
  }else if (req.body.km >= 75) {
    var km = req.body.km / 1.15;
  }else {
    var km = req.body.km;
  };

  if (req.body.numb_cars <= 3){
    var numb_cars = req.body.numb_cars * 1.1;
  }else if (req.body.numb_cars <= 6) {
    var numb_cars = req.body.numb_cars * 1.05;
  }else if (req.body.numb_cars <= 8) {
    var numb_cars = req.body.numb_cars * 1.025;
  }else if (req.body.numb_cars >= 12) {
    var numb_cars = req.body.numb_cars / 1.025;
  }else if (req.body.numb_cars >= 15) {
    var numb_cars = req.body.numb_cars / 1.05;
  }else if (req.body.numb_cars >= 18) {
    var numb_cars = req.body.numb_cars / 1.075;
  }else if (req.body.numb_cars >= 21) {
    var numb_cars = req.body.numb_cars / 1.1;
  }else {
    var numb_cars = req.body.numb_cars;
  };

  switch (req.body.periodOfExcebition) {
    case "1":
      var forPaymen = km * 1.5 * numb_cars * periodOfExcebitionInDays;
      break;
    case "2":
      var forPaymen = km * 1.35 * numb_cars * periodOfExcebitionInDays;
      break;
    case "3":
      var forPaymen = km * 1.25 * numb_cars * periodOfExcebitionInDays;
      break;
    case "4":
      var forPaymen = km * 1.1 * numb_cars * periodOfExcebitionInDays;
      break;
    case "5":
      var forPaymen = km * 1 * numb_cars * periodOfExcebitionInDays;
      break;
    case "6":
      var forPaymen = km / 1.05 * numb_cars * periodOfExcebitionInDays;
      break;
    default:
    res.status(400).send('inccorect periodOfExcebition');
    break;
  };

  console.log(forPaymen);
    var title = {
      car: req.body.car,
      km: req.body.km,
      numb_cars: req.body.numb_cars,
      type_car: req.body.type_car,
      data_start: req.body.data_start,
      moneyForDriver: forPaymen,
      periodOfExcebition: req.body.periodOfExcebition,
      status: "verified"
    };

    UserAdv.findByIdAndUpdate({_id: req.user._id}, title, {new: true, useFindAndModify: false}, async (err, user) => {
        if(err) return console.log(err);

        res.send(user);
    });
});

module.exports = router;
