"use strict";

const express = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('./../models/user.model');
const responseGenerator = require('./../libs/responseGenerator');
const config = require('./../libs/config');
const verifyToken = require('./../middleware/verifyToken');
const loginResponse = require('./../libs/loginResponse');

const userController = {};

// function to signup
userController.signup = function(req,res){
let newUser;
  if(req.body.firstname !== undefined && req.body.lastname !== undefined && req.body.password !== undefined && req.body.email !== undefined && req.body.phone !== undefined){
    if(req.body.password === req.body.confirmpass){
      newUser = new userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        confirmpass:req.body.confirmpass,
        email: req.body.email,
        phone: req.body.phone
      });
    }
    else{
      let response = responseGenerator.respGen(true,'password confirmation doesn\'t match',500,null);
      res.send(response);
    }

    newUser.save(function(err){
      if(err){
        let response = responseGenerator.respGen(true, 'error: '+err, 500, null);
        res.send(response);
      }
      else{
        let response = responseGenerator.respGen(false, 'successfully saved', 200, newUser);
        res.send(response);
      }
    });
  }
  else{
    let response = responseGenerator.respGen(true, 'some field is empty', 500, null);
    res.send(response);
  }
}

// function to login
userController.login = function(req,res){
  userModel.findOne({ $and:[{'email':req.body.email}, {'password':req.body.password}] }, function(err,foundUser){
    if(err){
      let response = responseGenerator.respGen(true, 'error: '+err, 500, null);
      res.send(response);
    }
    else if(foundUser === null || foundUser === undefined){
      let response = responseGenerator.respGen(true, 'wrong username/password', 500, null);
      res.send(response);
    }
    else{
      jwt.sign({user: foundUser.email},config.secret,function(err,token){
        if(err){
          res.send(err);
        }
        let data = {
          name: foundUser.firstname+' '+foundUser.lastname
        }
        res.cookie('token',token,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        let response = loginResponse.loginResp(false,'successfully logged in',foundUser.email,200,data);
        res.send(response);
      });
      //res.redirect('/api/dashboard');
    }
  })
}

// dashboard of the user
userController.dashboard = function(req,res){
  verifyToken.verifyUserToken(req.headers.cookie,function(authData){
    res.json({ authData });
  });
}

// function to logout
userController.logout = function(req,res){
  verifyToken.verifyUserToken(req.headers.cookie,function(authData){
    res.clearCookie('token',{path:'/'});
    let response = responseGenerator.respGen(false,'successfully logged out',200,null);
    res.send(response);
  });
}

module.exports = userController;
