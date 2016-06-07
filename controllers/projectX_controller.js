/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var burger = require('../models/projectX.js');

router.get('/', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	//console.log(hbsObject)
	res.render('index', hbsObject);
});

// router.get('/burgers', function(req,res) {
// 	burger.all(function(data){
// 		var hbsObject = {burgers : data}
// 		console.log(hbsObject)
// 		res.render('index', hbsObject);
// 	});
// });

// router.post('/burgers/create', function(req,res) {
// 	burger.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], function(data){
// 		res.redirect('/burgers')
// 	});
// });

// router.put('/burgers/update/:id', function(req,res) {
// 	var condition = 'id = ' + req.params.id;

// 	console.log('condition', condition);

// 	burger.update({'devoured' : req.body.devoured}, condition, function(data){
// 		res.redirect('/burgers');
// 	});
// });

module.exports = router;
