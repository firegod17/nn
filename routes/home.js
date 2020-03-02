const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
  // res.send(req.user);
  res.json({
    posts: {
      title: ' Home page ',
      description: 'Its your home page, with some data!'
    }
  });
});

module.exports = router;
