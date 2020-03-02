const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../../model/User');
const UserAdv = require('../../model/advertiser');

router.get('/', verify, async (req, res) => {
  User.findById({_id: req.user._id}, function(err, user){
    var kmMin = user.km - user.km * 0.1;
    var kmMax = kmMin / 0.81;
    var limit = req.body.limit;

    if(!user.km) return res.status(400).send("Please verify your account");

    UserAdv.find({km: {
        $gte: kmMin,
        $lt: kmMax
    }}).limit(3)
    .exec(function(err, user) {
      if (err) throw err;
      res.send(user);
    });
  });
});

module.exports = router;
