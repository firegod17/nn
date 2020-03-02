const mongoose = require('mongoose');

//Create Schema

const userSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        min: 2,
        max:200
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max:200
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max:1000
    },
    phone: {
        type: String,
        required: true,
        min: 6,
        max:200
    },
    car: String,
    km: Number,
    numb_cars: Number,
    type_car: String,
    data_start: String,
    status: String,
    // avatar: {
    //     type: String
    // },
    date: {
        type: Date,
        default: Date.now
    },
    moneyForDriver: Number,
    statusOfEmail: Boolean,
    periodOfExcebition: Number,
    wallet: {
      type: Number,
      default: 0
    },
    buferMoney: Number,
    historyOfPay:[],
});

module.exports = mongoose.model('advertisers', userSchema);
