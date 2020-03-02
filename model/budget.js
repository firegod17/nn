const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  totalBudget: Number,
  budgetAdv: Number,
  budgetForDrivers: Number,
  profit: Number,
  buferMoneyFromAdv: Number,
});

module.exports = mongoose.model('budget', userSchema);
