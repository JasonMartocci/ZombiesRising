var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();
var projectX = require('../models/projectX.js');
var user = require('../models/user.js');
var connection = require('../config/connection.js');

//this is the users_controller.js file
router.get('/profile/:id', function(req, res){

  var queryString = "select * from users "
  queryString += "left join orders on orders.user_id = users.id "
  queryString += "where users.id = " + req.params.id;
  console.log(queryString)
  connection.query(queryString, function(err, userAndShops) {
      if (err) throw err;
      res.render('users/show', {userAndShops: userAndShops})
  });
});

router.get('/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/')
  })
});

router.post('/login', function(req, res) {
	var email = req.body.email;
	var condition = "emailAddress = '" + email + "'";

	user.findOne(condition, function(user){
		if (user.length > 0){
			bcrypt.compare(req.body.password, user[0].password, function(err, result) {
					if (result == true){
						req.session.logged_in = true;
						req.session.user_id = user[0].userId;
						req.session.user_email = user[0].email;
						if (user[0].role == 'admin') {
							req.session.isAdmin = true;
							debugger;
							console.log('This is admin - ', req.session.isAdmin);
						} else if (user[0].role == 'user') {
							req.session.isUser = true;
							debugger;
							console.log('This is user - ', req.session.isUser);
						}
						res.redirect('/index');
					}else{
						res.redirect('/signInFail');
          		}			
			});
		}else{
			res.redirect('/signInFail');
		}
	});
});

router.post('/create', function(req,res) {
	var queryString = "select * from users where emailAddress = '" + req.body.emailAddress + "'";
	connection.query(queryString, function(err, users) {
		if (err) throw err;
		if (users.length > 0){

//fix this
			res.send('we already have an email or username for this account');

		}else{
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.body.password, salt, function(err, hash) {
	              	user.createUser(['name','userName', 'emailAddress', 'password', 'role'], [req.body.name, req.body.username, req.body.emailAddress, hash, req.body.role], function(user){
		                req.session.username = req.body.username;//we need to grab the username from the form because we don't get it back from MySQL. If we wanted to grab it, then we'd have to do another sql query but it's unnecessary since we already have it here.
		                req.session.user_email = req.body.email; //we need to grab the email from the form because we don't get it back from MySQL. If we wanted to grab it, then we'd have to do another sql query but it's unnecessary since we already have it here.
		                req.session.logged_in = true;
		                req.session.user_id = user.insertId; //the MySQL npm package returns the id of the record inserted with a key of insertId.

						// chain with promises 

						projectX.createNewUserHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage', 'userId'], ['heroOne', 'BydaCtQr_shooterOne.png',' 50', '10', false, true, false, '0', '2', '2', req.session.user_id], function(data){});
						
						projectX.createNewUserHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage', 'userId'], ['heroTwo', 'BydaCtQr_shooterOne.png',' 75', '20', false, true, false, '0', '5', '3', req.session.user_id], function(data){});
						
						projectX.createNewUserHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage', 'userId'], ['heroThree', 'BydaCtQr_shooterOne.png',' 100', '10', false, false, true, '0', '0', '50', req.session.user_id], function(data){});
						
						projectX.createNewUserHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage', 'userId'], ['heroFour', 'BydaCtQr_shooterOne.png',' 125', '10', false, false, true, '0', '0', '50', req.session.user_id], function(data){});						

						projectX.createNewUserHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage', 'userId'], ['heroFive', 'BydaCtQr_shooterOne.png',' 150', '15', true, false, false, '8', '0', '0', req.session.user_id], function(data){});
						
						projectX.createNewUserHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage', 'userId'], ['heroSix', 'BydaCtQr_shooterOne.png',' 175', '15', true, false, false, '8', '0', '0', req.session.user_id], function(data){});
						
						projectX.createNewUserHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage', 'userId'], ['heroSeven', 'BydaCtQr_shooterOne.png',' 200', '10', false, true, false, '0', '2', '2', req.session.user_id], function(data){});
						
						projectX.createNewUserHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage', 'userId'], ['heroEight', 'BydaCtQr_shooterOne.png',' 225', '20', false, true, false, '0', '5', '3', req.session.user_id], function(data){});
						
						projectX.createNewUserHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage', 'userId'], ['heroNine', 'BydaCtQr_shooterOne.png',' 250', '15', true, false, false, '8', '0', '0', req.session.user_id], function(data){});
						
						projectX.createNewUserHeroes(['plantTypes', 'asset', 'cost', 'energy', 'isSunProducer', 'isShooter', 'isExploding', 'sunFrequency', 'shootingFrequency', 'damage', 'userId'], ['heroTen', 'BydaCtQr_shooterOne.png',' 275', '10', false, false, true, '0', '2', '50', req.session.user_id], function(data){});

						projectX.createNewUserEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy', 'userId'], ["zombieOne", "ryi--XNH_zombieOne.png", 0.5, -20, 3, req.session.user_id], function(data){});

						projectX.createNewUserEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy', 'userId'], ["zombieTwo", "r1PYLiQr_zombieTwo.png", 1, -8, 10, req.session.user_id], function(data){});

						projectX.createNewUserEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy', 'userId'], ["zombieThree", "r1ANbmNS_zombieThree.png", 1.25, -10, 10, req.session.user_id], function(data){});

						projectX.createNewUserEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy', 'userId'], ["zombieFour", "rybrXX4r_zombieFour.png", 1.5, -9, 35, req.session.user_id], function(data){});

						projectX.createNewUserEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy', 'userId'], ["zombieFive", "ryi--XNH_zombieOne.png", 1.75, -8, 40, req.session.user_id], function(data){});

						projectX.createNewUserEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy', 'userId'], ["bossOne", "rJfc-E4r_bossOne.png", 2.00, -15, 45, req.session.user_id], function(data){});

						projectX.createNewUserEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy', 'userId'], ["bossTwo", "rJfc-E4r_bossOne.png", 2.25, -15, 45, req.session.user_id], function(data){});

						projectX.createNewUserEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy', 'userId'], ["bossThree", "rJfc-E4r_bossOne.png", 2.50, -15, 45, req.session.user_id], function(data){});

						projectX.createNewUserEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy', 'userId'], ["bossFour", "rJfc-E4r_bossOne.png", 2.75, -15, 45, req.session.user_id], function(data){});

						projectX.createNewUserEnemies(['zombieTypes', 'asset', 'damage', 'vx', 'energy', 'userId'], ["bossFive", "rJfc-E4r_bossOne.png", 3, -15, 45, req.session.user_id], function(data){
		                	res.redirect('/index')
						});

						console.log(req.session);
						console.log(req.session.logged_in);
						console.log(req.session.username);
	            	});
				});
			});
		}
	});
});

module.exports = router;