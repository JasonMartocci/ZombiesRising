/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var burger = require('../models/projectX.js');

router.get('/', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	res.render('signIn', hbsObject);
});

router.get('/index', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	res.render('index', hbsObject);
});

router.get('/game', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	res.render('game', hbsObject);
});

router.get('/signIn', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	res.render('signIn', hbsObject);
});

module.exports = router;
