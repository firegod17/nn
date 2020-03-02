const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const UserAdv = require('../model/advertiser');


router.post('/', verify, async (req, res) => {
  User.findById({_id: req.user._id}, function(err, user){
    res.send(user.status);
  });
});

router.get('/Adv', verify, async (req, res) => {
  UserAdv.findById({_id: req.user._id}, function(err, user){
    res.send(user.status);
    console.log(user);
  });
});

module.exports = router;
