var orm = require('../config/orm.js');

var shop = {
	all: function(cb) {
		orm.all('inventory', function(res){
			cb(res);
		});
	},

	allUsers: function(cb) {
		orm.all('users', function(res){
			cb(res);
		});
	},

	createUser: function(cols, vals, cb) {
		orm.createUser('users', cols, vals, function(res){
			cb(res);
		});
	},

	updateUser: function(objColVals, condition, cb) {
		orm.update('users', objColVals, condition, function(res){
			cb(res);
		});
	},

	deleteUser: function(condition, cb) {
		orm.delete('users', condition, function(res){
			cb(res);
		});
	},

	allHeroes: function(cb) {
		orm.all('heroes', function(res){
			cb(res);
		});
	},

	createHeroes: function(cols, vals, cb) {
		orm.createHeroes('heroes', cols, vals, function(res){
			cb(res);
		});
	},

	updateHeroes: function(objColVals, condition, cb) {
		orm.update('heroes', objColVals, condition, function(res){
			cb(res);
		});
	},

	deleteHeroes: function(condition, cb) {
		orm.delete('heroes', condition, function(res){
			cb(res);
		});
	},

	allEnemies: function(cb) {
		orm.all('enemies', function(res){
			cb(res);
		});
	},

	createEnemies: function(cols, vals, cb) {
		orm.createEnemies('enemies', cols, vals, function(res){
			cb(res);
		});
	},

	updateEnemies: function(objColVals, condition, cb) {
		orm.update('enemies', objColVals, condition, function(res){
			cb(res);
		});
	},

	deleteEnemies: function(condition, cb) {
		orm.delete('enemies', condition, function(res){
			cb(res);
		});
	},
};

module.exports = shop;