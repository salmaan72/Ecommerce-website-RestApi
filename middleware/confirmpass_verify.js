"use strict"

const responseGenerator = require('./../libs/responseGenerator');
let confirmpass_verify = {};

// function to confirm whether entered and re-entered passwords are matched
confirmpass_verify.confirmpass = function(req,res,next){
  if(req.body.password === req.body.confirmpass){
    next();
  }
  else{
    let response = responseGenerator.respGen(true, 'password confirmation failed',500,null);
    res.send(response);
  }
}

module.exports = confirmpass_verify;
