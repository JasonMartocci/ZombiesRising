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

router.get('/signInFail', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	res.render('signInFail', hbsObject);
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

router.get('/levels', function(req,res) {
	projectX.allLevels(function(data){
		var hbsObject = {levels : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		res.render('levels', hbsObject);
	});
});

router.get('/characters', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	res.render('characters', hbsObject);
});

router.get('/heroes', function(req,res) {
	var condition = 'userId = ' + req.session.user_id;
	projectX.allHeroes(condition, function(data){
		var hbsObject = {heroes : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		res.render('heroes', hbsObject);
	});
});

router.post('/heroes/createNewHeroes', function(req,res) {
	var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		console.log(fields);
		console.log(files);

		// Load the AWS SDK for Node.js
		var AWS = require('aws-sdk');
		var shortid = require('shortid');
		var fs = require('fs');
		var fileStream = fs.createReadStream(files.asset.path);
		var newFilename = shortid.generate()+"_"+files.asset.name;

		// Set your region for future requests.
		AWS.config.region = 'us-west-2';
		AWS.config.accessKeyId = 'AKIAIECXXO6BFSUJONGQ';
		AWS.config.secretAccessKey = 'gTTAPSwTYHgswfChCmNYz3vOE6EIm/fE7VKkLO7q';

		console.log(newFilename);

		fileStream.on('error', function (err) {
		  if (err) { throw err; }
		});

		fileStream.on('open', function () {
			var s3bucket = new AWS.S3({params: {Bucket: 'zombiesrising'}});
			s3bucket.createBucket(function() {
			  var params = {Key: newFilename, Body: fileStream, ContentType: 'image/png'};
			  s3bucket.upload(params, function(err, data) {
			    if (err) {
			      	console.log("Error uploading data: ", err);
			    } else {
					console.log("Successfully uploaded data to zombiesrising/myKey");

					projectX.createHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage'], [fields.plantTypes, newFilename, fields.cost, fields.energy, fields.isSunProducer, fields.isShooter, fields.isExploding, fields.sunFrequency, fields.shootingFrequency, fields.damage], function(data){
						res.redirect('/heroes')
					});
			    }
			  });
			});
		});
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

router.post('/heroes/updateImage/:heroesId/:plantTypes/:cost/:energy/:isSunProducer/:isShooter/:isExploding/:sunFrequency/:shootingFrequency/:damage', function(req,res) {
	var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		console.log(fields);
		console.log(files);

		// Load the AWS SDK for Node.js
		var AWS = require('aws-sdk');
		var shortid = require('shortid');
		var fs = require('fs');
		var fileStream = fs.createReadStream(files.asset.path);
		var newFilename = shortid.generate()+"_"+files.asset.name;


		// Set your region for future requests.
		AWS.config.region = 'us-west-2';
		AWS.config.accessKeyId = 'AKIAIECXXO6BFSUJONGQ';
		AWS.config.secretAccessKey = 'gTTAPSwTYHgswfChCmNYz3vOE6EIm/fE7VKkLO7q';

		console.log(newFilename);

		fileStream.on('error', function (err) {
		  if (err) { throw err; }
		});

		fileStream.on('open', function () {
			var s3bucket = new AWS.S3({params: {Bucket: 'zombiesrising'}});
			s3bucket.createBucket(function() {
			  var params = {Key: newFilename, Body: fileStream, ContentType: 'image/png'};
			  s3bucket.upload(params, function(err, data) {
			    if (err) {
			      	console.log("Error uploading data: ", err);
			    } else {
					console.log("Successfully uploaded data to zombiesrising/myKey");
					
					var condition = 'heroesId = ' + req.params.heroesId;
					console.log('condition', condition);
					projectX.updateHeroes({'plantTypes ' : req.params.plantTypes, ', asset ' : newFilename, ', cost ' : req.params.cost, ', energy ' : req.params.energy, ', isSunProducer ' : req.params.isSunProducer, ', isShooter ' : req.params.isShooter, ', isExploding ' : req.params.isExploding, ', sunFrequency ' : req.params.sunFrequency, ', shootingFrequency ' : req.params.shootingFrequency, ', damage ' : req.params.damage}, condition, function(data){
						res.redirect('/heroes');
					});
			    }
			  });
			});
		});
    });
});

router.get('/enemies', function(req,res) {
	var condition = 'userId = ' + req.session.user_id;
	projectX.allEnemies(condition, function(data){
		var hbsObject = {enemies : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		res.render('enemies', hbsObject);
	});
});

router.post('/enemies/createNewEnemies', function(req,res) {
	var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		console.log(fields);
		console.log(files);

		// Load the AWS SDK for Node.js
		var AWS = require('aws-sdk');
		var shortid = require('shortid');
		var fs = require('fs');
		var fileStream = fs.createReadStream(files.asset.path);
		var newFilename = shortid.generate()+"_"+files.asset.name;

		// Set your region for future requests.
		AWS.config.region = 'us-west-2';
		AWS.config.accessKeyId = 'AKIAIECXXO6BFSUJONGQ';
		AWS.config.secretAccessKey = 'gTTAPSwTYHgswfChCmNYz3vOE6EIm/fE7VKkLO7q';

		console.log(newFilename);

		fileStream.on('error', function (err) {
		  if (err) { throw err; }
		});

		fileStream.on('open', function () {
			var s3bucket = new AWS.S3({params: {Bucket: 'zombiesrising'}});
			s3bucket.createBucket(function() {
			  var params = {Key: newFilename, Body: fileStream, ContentType: 'image/png'};
			  s3bucket.upload(params, function(err, data) {
			    if (err) {
			      	console.log("Error uploading data: ", err);
			    } else {
					console.log("Successfully uploaded data to zombiesrising/myKey");
					
					projectX.createEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy'], [fields.zombieTypes, newFilename, fields.damage, fields.vx, fields.energy], function(data){
						res.redirect('/enemies')
					});
			    }
			  });
			});
		});
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
	projectX.updateEnemies({'zombieTypes ' : req.body.zombieTypes, ', damage ' : req.body.damage, ', vx ' : req.body.vx, ', energy ' : req.body.energy}, condition, function(data){
		res.redirect('/enemies');
	});
});

router.post('/enemies/updateImage/:enemiesId/:zombieTypes/:vx/:damage/:energy', function(req,res) {
	var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

	var form = new formidable.IncomingForm();

	form.parse(req, function(err, fields, files) {
		console.log(fields);
		console.log(files);

		// Load the AWS SDK for Node.js
		var AWS = require('aws-sdk');
		var shortid = require('shortid');
		var fs = require('fs');
		var fileStream = fs.createReadStream(files.asset.path);
		var newFilename = shortid.generate()+"_"+files.asset.name;


		// Set your region for future requests.
		AWS.config.region = 'us-west-2';
		AWS.config.accessKeyId = 'AKIAIECXXO6BFSUJONGQ';
		AWS.config.secretAccessKey = 'gTTAPSwTYHgswfChCmNYz3vOE6EIm/fE7VKkLO7q';

		console.log(newFilename);

		fileStream.on('error', function (err) {
		  if (err) { throw err; }
		});

		fileStream.on('open', function () {
			var s3bucket = new AWS.S3({params: {Bucket: 'zombiesrising'}});
			s3bucket.createBucket(function() {
			  var params = {Key: newFilename, Body: fileStream, ContentType: 'image/png'};
			  s3bucket.upload(params, function(err, data) {
			    if (err) {
			      	console.log("Error uploading data: ", err);
			    } else {
					console.log("Successfully uploaded data to zombiesrising/myKey");
					
					var condition = 'enemiesId = ' + req.params.enemiesId;
					console.log('condition', condition);
					projectX.updateEnemies({'zombieTypes ' : req.params.zombieTypes, ', asset ' : newFilename, ', damage ' : req.params.damage, ', vx ' : req.params.vx, ', energy ' : req.params.energy}, condition, function(data){
						res.redirect('/enemies');
					});
			    }
			  });
			});
		});
    });
});

// router.get('/game', function(req,res) {
// 	projectX.allGameData(function(data){
// 		var hbsObject = {heroes : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
// 		// console.log(data);
// 		res.render('game', hbsObject);
// 	});
// });

router.get('/game', function(req,res) {
	var condition = 'userId = ' + req.session.user_id;
	projectX.allGameData(condition, function(data){
		var hbsObject = {heroes : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		res.render('game', hbsObject);
	});
});

router.get('/api/heroes', function(req,res) {
	var condition = 'userId = ' + req.session.user_id;
	projectX.allHeroes(condition, function(data){
		var hbsObject = {heroes : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		// console.log(data);
		res.send(hbsObject);
	});
});

router.get('/api/enemies', function(req,res) {
	var condition = 'userId = ' + req.session.user_id;
	projectX.allEnemies(condition, function(data){
		var hbsObject = {enemies : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		// console.log(data);
		res.send(hbsObject);
	});
});

// router.get('/game/:userId', function(req,res) {
// 	var condition = 'userId = ' + req.params.userId;
// 	console.log('game ', condition);
// 	projectX.allGameData(function(data){
// 		var hbsObject = {heroes : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
// 		// console.log(data);
// 		res.render('game', hbsObject);
// 	});
// });

// router.get('/api/heroes/:userId', function(req,res) {
// 	var condition = 'userId = ' + req.params.userId;
// 	console.log('api heroes ', condition);
// 	projectX.allHeroes(function(data){
// 		var hbsObject = {heroes : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
// 		// console.log(data);
// 		res.send(hbsObject);
// 	});
// });

// router.get('/api/enemies/:userId', function(req,res) {
// 	var condition = 'userId = ' + req.params.userId;
// 	console.log('api enemies ', condition);
// 	// var condition = 'userId = ' + req.session.userId;
// 	projectX.allEnemies(function(data){
// 		var hbsObject = {enemies : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
// 		// console.log(data);
// 		res.send(hbsObject);
// 	});
// });

router.get('/api/characters', function(req,res) {
	projectX.allCharacters(function(data){
		var hbsObject = {enemies : data, heroes : data, logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
		// console.log(data);
		res.send(hbsObject);
	});
});

router.get('/signIn', function(req,res) {
	var hbsObject = {logged_in: req.session.logged_in, isUser: req.session.isUser, isAdmin: req.session.isAdmin}
	res.render('signIn', hbsObject);
});

module.exports = router;
