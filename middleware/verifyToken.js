"use strict"

const jwt = require('jsonwebtoken');
const config = require('./../libs/config');
const responseGenerator = require('./../libs/responseGenerator');

let verifyToken = {};

// (JWT) token verification 
verifyToken.verifyUserToken = function(cookie,callback){
  if(cookie){
    let token = cookie.split('=');
    let data = jwt.verify(token[1], config.secret, function(err,authData){
      if(err){
        res.sendStatus(403);
      }
      else{
        return authData;
      }
    });
    callback(data);
  }
  else{
    throw Error('Access denied. Please login to continue');
  }
}

module.exports = verifyToken;
