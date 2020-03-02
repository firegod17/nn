const router = require('express').Router();
const verify = require('../verifyToken');
const User = require('../../model/User');

router.post('/', verify, async (req, res) => {
  User.findById({_id: req.body._id}, function(err, user){
    if(err) return console.log(err);

    if(!user.km||!user.car) return res.json({
          name: user.name,
          phone: user.phone,
          email: user.email,
    });
    if(user.km||user.car) return res.json({
          name: user.name,
          phone: user.phone,
          email: user.email,
          km: user.km,
          car: user.car
    });
  });
});

module.exports = router;
