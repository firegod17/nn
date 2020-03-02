const mongoose = require('mongoose');

//Create Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
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
    km: String,
    car: String,
    status: String,
    companyName: String,
    companyId: String,
    // avatar: {
    //     type: String
    // },
    date: {
        type: Date,
        default: Date.now
    },
    dateOfLastEnter: {
      type: Date,
      default: Date.now
    },
    unconfirmedWallet: Number,
    wallet: {
      type: Number,
      default: 0
    },
});

module.exports = mongoose.model('Users', userSchema);
