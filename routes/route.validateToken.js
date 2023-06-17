const jwt = require('jsonwebtoken');
const jwtService = require("../services/validationService");

const jwt_secret_key = "my_secret_key";
const jwt_expiryTime = '100s'



module.exports = (app) => {

  app.post('/generate/token', async (req, res) => {
    try {

      //creating user from request body
      const user = {
        userName: req.body.userName ? req.body.userName : '',
        userId: req.body.userId ? req.body.userId : ''
      }
      // generating token 
      const token = await jwtService.generateToken(user, jwt_secret_key, jwt_expiryTime);
      // console.log("token generated--------->", token);
      res.status(200).json(token);
    }
    catch (error) {
      // console.log("token generation failed************", error);
      res.status(error.status_code || 500).json(error);
    }

  });



  //verify token and showing Authentication data
  app.get('/validate/token', verifyToken, async (req, res) => {
    try {
      //validating token
      const token = await jwtService.validateToken(req.token, jwt_secret_key, jwt_expiryTime);
      res.status(200).json(token);
    } catch (error) {
      // console.log("Invalid token************",error);
      res.status(error.status_code || 403).json(error);
    }

  });


  //function for verify the token
  function verifyToken(req, res, next) {
    //get auth header value
    // console.log("header value is-------->",req.headers);
    const bearerheader = req.headers['authorization'];
    //check if header is undefined
    if (typeof bearerheader !== 'undefined') {
      //split the space
      const bearer = bearerheader.split(' ');
      //get the token from array
      const bearerToken = bearer[1];
      //set the token
      req.token = bearerToken;
      //calling next middleware
      next();
    }
    else {
      //forbidden
      res.sendStatus(403);
    }
  }

}