'use strict';

var express = require('express');
var User = require('./../db/user.js');
var TwitterKeys = require('../../twitterKeys.js');

// JWT: token assignment
var jwt = require('jwt');
var assignToken = express.Router();

// third party login auth
var passport = require('passport');
var TwitterStrategy = require('passport-twitter');

// password salt and hash
var Bcrypt = require('bcrypt');

//ENV
// var env = require('node-env-file');
// var env = require('__dirname' + '/../.env');

// exporting handlers

module.exports = assignToken;

