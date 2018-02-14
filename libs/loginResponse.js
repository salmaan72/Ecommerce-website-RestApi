"use strict";

const loginResponse = {};

loginResponse.loginResp = function(error,msg,user,status,data){
  let response = {
    error: error,
    message: msg,
    user_email:user,
    status: status,
    data: data
  }
  return response;
}

module.exports = loginResponse;
