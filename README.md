# CarBanner_backend
Backend for carBanner

<h1>Download</h1>

`npm install -save express mpngodb body-parser`
<br>`npm install --save-dev nodemon`
<br>`npm install dotenv`
<br>`npm install mongoose`
<br>`npm install @hapi/joi`
<br>`npm install bcryptjs`
<br>`npm install jsonwebtoken`
<br>`npm install springedge`
<br>`npm install --save ejs nexmo socket.io`

<h1>For Start</h1>


`npm start`

<br><h4>First part</h4> do post request to http://localhost:8000/api/user/registerDriver. Send json:

```
{
    "name": "some name",
    "email": "some email",
    "phone": "some phone",
    "password": "some password"
}
```

<br><h4>Second part</h4> do post request to http://localhost:8000/api/user/login. Send json:

```
{
    "email": "your email",
    "password": "your password"
}
```
Save token!

<br><h4>Third part</h4> do get request to http://localhost:8000/api/account/home.

Add in header `auth-token` with your token.

<h1>For good work</h1>

1) Postman:
https://www.getpostman.com/downloads/

2) MongoDB:
https://cloud.mongodb.com
