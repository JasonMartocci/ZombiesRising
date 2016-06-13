var express = require('express');
var _ = require('underscore');
var router = express.Router();
var projectX = require('../models/projectX.js');

router.get('/', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	res.render('signIn', hbsObject);
});

router.get('/index', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	res.render('index', hbsObject);
});

router.get('/admin', function(req,res) {
	projectX.allUsers(function(data){
		var hbsObject = {users : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		res.render('admin', hbsObject);
	});
});

router.get('/users', function(req,res) {
	projectX.allUsers(function(data){
		var hbsObject = {users : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		res.render('users', hbsObject);
	});
});

router.post('/users/createNewUser', function(req,res) {
	projectX.createUser(['userName', 'name', 'emailAddress', 'password', 'role'], [req.body.username, req.body.name, req.body.emailAddress, req.body.password, req.body.role], function(data){
		res.redirect('/users')
	});
});

router.delete('/users/delete/:userId', function(req,res) {
	var condition = 'userId = ' + req.params.userId;
	console.log('condition', condition);
	projectX.deleteUser(condition, function(data){
		res.redirect('/users')
	});
});

router.put('/users/update/:userId', function(req,res) {
	var condition = 'userId = ' + req.params.userId;
	console.log('condition', condition);
	projectX.updateUser({'userName ' : req.body.username, ', name ' : req.body.name, ', emailAddress ' : req.body.emailAddress, ', role ' : req.body.role}, condition, function(data){
		res.redirect('/users');
	});
});

router.get('/characters', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	res.render('characters', hbsObject);
});

router.get('/heroes', function(req,res) {
	projectX.allHeroes(function(data){
		var hbsObject = {heroes : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		res.render('heroes', hbsObject);
	});
});

router.post('/heroes/createNewHeroes', function(req,res) {
	projectX.createHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage'], [req.body.plantTypes, req.body.asset, req.body.cost, req.body.energy, req.body.isSunProducer, req.body.isShooter, req.body.isExploding, req.body.sunFrequency, req.body.shootingFrequency, req.body.damage], function(data){
		res.redirect('/heroes')
	});
});

router.delete('/heroes/delete/:heroesId', function(req,res) {
	var condition = 'heroesId = ' + req.params.heroesId;
	console.log('condition', condition);
	projectX.deleteHeroes(condition, function(data){
		res.redirect('/heroes')
	});
});

router.put('/heroes/update/:heroesId', function(req,res) {
	var condition = 'heroesId = ' + req.params.heroesId;
	console.log('condition', condition);
	projectX.updateHeroes({'plantTypes ' : req.body.plantTypes, ', asset ' : req.body.asset, ', cost ' : req.body.cost, ', energy ' : req.body.energy, ', isSunProducer ' : req.body.isSunProducer, ', isShooter ' : req.body.isShooter, ', isExploding ' : req.body.isExploding, ', sunFrequency ' : req.body.sunFrequency, ', shootingFrequency ' : req.body.shootingFrequency, ', damage ' : req.body.damage}, condition, function(data){
		res.redirect('/heroes');
	});
});
router.get('/enemies', function(req,res) {
	projectX.allEnemies(function(data){
		var hbsObject = {enemies : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		res.render('enemies', hbsObject);
	});
});

router.post('/enemies/createNewEnemies', function(req,res) {
	projectX.createEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy'], [req.body.zombieTypes, req.body.asset, req.body.damage, req.body.vx, req.body.energy], function(data){
		res.redirect('/enemies')
	});
});

router.delete('/enemies/delete/:enemiesId', function(req,res) {
	var condition = 'enemiesId = ' + req.params.enemiesId;
	console.log('condition', condition);
	projectX.deleteEnemies(condition, function(data){
		res.redirect('/enemies')
	});
});

router.put('/enemies/update/:enemiesId', function(req,res) {
	var condition = 'enemiesId = ' + req.params.enemiesId;
	console.log('condition', condition);
	projectX.updateEnemies({'zombieTypes ' : req.body.zombieTypes, ', asset ' : req.body.asset, ', damage ' : req.body.damage, ', vx ' : req.body.vx, ', energy ' : req.body.energy}, condition, function(data){
		res.redirect('/enemies');
	});
});

router.get('/game', function(req,res) {
	projectX.allGameData(function(data){
		var hbsObject = {heroes : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		console.log(data);
		res.render('game', hbsObject, data);
	});
});

router.get('/signIn', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	res.render('signIn', hbsObject);
});

module.exports = router;