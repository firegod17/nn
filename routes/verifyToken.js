const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
  const token = req.header('auth-token');
  if(!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    // console.log(req.user._id);
    next();
  } catch (err) {
    res.status(404).send('Invalid token. Error: ' + err);
  }
}
