"use strict"

const jwt = require('jsonwebtoken');
const config = require('./../libs/config');

let verifyToken = {};

verifyToken.verifyUserToken = function(cookie,callback){
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

module.exports = verifyToken;
