const router = require('express').Router();
const User = require('../model/User');
const UserAdv = require('../model/advertiser');
const bcrypt = require('bcryptjs');
const {registerValidationDriver, loginValidation, registerValidationAdv} = require('../validation');
const jwt = require('jsonwebtoken');
const springedge = require('springedge');
const Nexmo = require('nexmo');
const nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "drivvy.inc@gmail.com",
        pass: "zexbup-8sezwy-jympEx"
    }
});
var mailOptions,host,link;


router.get('/verifyEmail',function(req,res){
  UserAdv.findByIdAndUpdate({_id: req.query.id},
  {statusOfEmail: true},
  {new: true, useFindAndModify: false},
  async (err, user) => {
    if(err) return res.status(400).send(err);

    // console.log(req.protocol+"://"+req.get('host'));
    // console.log("http://"+host);
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id == user._id)
        {
            console.log("email is verified");
            res.end("<h1>Email "+mailOptions.to+" has been Successfully verified");
        }else{
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }else{
        res.end("<h1>Request is from unknown source");
    }
  });
});

function random4Digit(){
  return shuffle( "0123456789".split('') ).join('').substring(0,4);
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
let code;

router.post('/registerDriver', async (req, res)=>{
  const { error } = registerValidationDriver(req.body);
  if (error) return res.status(403).send({error: error.details[0].message});

  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(401).send('This email alredy exist');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
    status: "unverified"
  });
  try{
    const savedUser = await user.save();
    res.send({_id: user._id});
  }catch(err){
    res.status(400).send({error: err});
  }
  // const nexmo = new Nexmo({
  //   apiKey: '1e3a8426',
  //   apiSecret: 'HLNOWSdVHeL2HCw4',
  // });
  // code = random4Digit();
  // nexmo.verify.request({
  //   number: '380507690284',
  //   brand: 'carBanner',
  //   code_length: '4'
  //   }, (err, result) => {
  //     console.log(err ? err : result)
  // });
});

router.post('/registerAdvertiser', async (req, res)=>{
  const { error } = registerValidationAdv(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await UserAdv.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send('This email alredy exist');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const userAdv = new UserAdv({
    companyName: req.body.companyName,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
    status: "unverified",
    statusOfEmail: false
  })
  try{
    const savedUser = await userAdv.save();
    res.send({_id: userAdv._id, companyName: userAdv.companyName});

    host = req.get('host');
    link = "http://" + req.get('host') + "/api/user/verifyEmail?id=" + userAdv._id;

    mailOptions={
        to : req.body.email,
        subject : "Please confirm your Email account",
        html : "Hello,<br>It's Drivvy. Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    }
    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
        console.log(error);
        res.end("error");
     }else{
        console.log("Message sent: " + response.message);
        res.end("sent");
      }
    });
  }catch(err){
    res.status(400).send(err);
  }
});

// router.post('/cancel',async (req, res) => {
//   nexmo.verify.control({
//     request_id: 'b0e4947114ad4307b8ddd3bee4b332a5',
//     cmd: 'cancel'
//     }, (err, result) => {
//       console.log(err ? err : result)
//   });
// });
//
// router.post('/check',async (req, res) => {
//   nexmo.verify.check({
//   request_id: 'REQUEST_ID',
//   code: req.body.code
// }, (err, result) => {
//   console.log(err ? err : result)
// });
// });

router.post('/loginDriver',async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Driver Log in
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(401).send('Email or password inccorect!');

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(401).send('Email or password inccorect!');

  const dateOfLastEnter = await User.findOneAndUpdate(
    {email: req.body.email},
    {dateOfLastEnter: new Date},
    {new: true, useFindAndModify: false});

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({_id: user._id, token: token});
});


router.post('/loginAdvertiser',async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //ADV log in
  const userAdv = await UserAdv.findOne({email: req.body.email});
  if (!userAdv) return res.status(400).send('Email or password inccorect!');
  if (!userAdv.statusOfEmail) return res.status(400).send('Please verify your Email!');

  const validPassAdv = await bcrypt.compare(req.body.password, userAdv.password);
  if (!validPassAdv) return res.status(400).send('Email or password inccorect!');

  const tokenAdv = jwt.sign({_id: userAdv._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', tokenAdv).send({
    companyName: userAdv.companyName,
    email: userAdv.email,
    phone: userAdv.phone,
    token: tokenAdv,
    status: userAdv.status,
    km: userAdv.km,
    car: userAdv.car,
    numb_cars: userAdv.numb_cars,
    type_car: userAdv.type_car,
    data_start: userAdv.data_start
  });
});

module.exports = router;
