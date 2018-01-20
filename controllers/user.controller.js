"use strict";

const express = require('express');
const userModel = require('./../models/user.model');
const userResponseGenerator = require('./../libs/user.responseGenerator');

const userController = {};

userController.signup = function(req,res){

  if(req.body.firstname !== undefined && req.body.lastname !== undefined && req.body.password !== undefined && req.body.email !== undefined && req.body.phone !== undefined){
    let newUser = new userModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone
    });

    newUser.save(function(err){
      if(err){
        let response = userResponseGenerator.responseGenerator(true, 'error: '+err, 500, null);
        res.send(response);
      }
      else{
        let response = userResponseGenerator.responseGenerator(false, 'successfully saved', 200, newUser);
        res.send(response);
      }
    });
  }
  else{
    let response = userResponseGenerator.responseGenerator(true, 'some field is empty', 500, null);
    res.send(response);
  }
}

userController.login = function(req,res){
  userModel.findOne({ $and:[{'email':req.body.email}, {'password':req.body.password}] }, function(err,foundUser){
    if(err){
      let response = userResponseGenerator.responseGenerator(true, 'error: '+err, 500, null);
      res.send(response);
    }
    else if(foundUser === null || foundUser === undefined){
      let response = userResponseGenerator.responseGenerator(true, 'wrong username/password', 500, null);
      res.send(response);
    }
    else{
      res.redirect('/api/homepage');
    }
  })
}

module.exports = userController;
