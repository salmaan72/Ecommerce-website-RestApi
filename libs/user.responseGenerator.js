"use strict";

const userResponseGenerator = {};

userResponseGenerator.responseGenerator = function(error,msg,status,data){
  let response = {
    error: error,
    message: msg,
    status: status,
    data: data
  }
  return response;
}

module.exports = userResponseGenerator;
