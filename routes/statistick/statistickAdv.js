const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../../model/User');
const UserAdv = require('../../model/advertiser');

router.get('/', verify, async (req, res) => {
  User.find({companyId: req.user._id}, function(err, user){
    if(err) return res.status(400).send(err);
    res.send(user);
  });
});

module.exports = router;
