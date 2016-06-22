var connection = require('../config/connection.js');

function printQuestionMarks(num){
  var arr = [];

  for (var i=0; i<num; i++){
    arr.push('?')
  }

  return arr.toString();
}

function objToSql(ob){
  //column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    arr.push(key + '= ' + "'" + ob[key] + "'");
  }

  return arr.join(" ");
}

var orm = {
  findOne: function(tableInput, condition, cb) {
    var queryString = 'SELECT * FROM ' + tableInput;
    queryString = queryString + ' WHERE ';
    queryString = queryString + condition;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
    });
  },
  
  createUser: function(table, cols, vals, cb) {
    var queryString = 'INSERT INTO ' + table;

    queryString = queryString + ' (';
    queryString = queryString + cols.toString();
    queryString = queryString + ') ';
    queryString = queryString + 'VALUES (';
    queryString = queryString + printQuestionMarks(vals.length);
    queryString = queryString + ') ';

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  all: function(tableInput, cb) {
    var queryString = 'SELECT * FROM ' + tableInput + ';';
    connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
    });
  },

  update: function(table, objColVals, condition, cb) {
    var queryString = 'UPDATE ' + table;
    console.log(objToSql(objColVals));
    queryString += ' SET ';
    queryString += objToSql(objColVals).toString();
    queryString += ' WHERE ';
    queryString += condition;

    console.log(queryString)
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  delete: function(table, condition, cb){
    var queryString = 'DELETE FROM ' + table;
    queryString += ' WHERE ';
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  createHeroes: function(table, cols, vals, cb) {
    var queryString = 'INSERT INTO ' + table;

    queryString += ' (plantTypes, asset, cost, energy, isSunProducer, isShooter, isExploding, sunFrequency, shootingFrequency, damage) ';
    queryString += 'VALUES';
    queryString += ' (';
    queryString = queryString + printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString)

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  createEnemies: function(table, cols, vals, cb) {
    var queryString = 'INSERT INTO ' + table;

    queryString += ' (zombieTypes, asset, damage, vx, energy) ';
    queryString += 'VALUES';
    queryString += ' (';
    queryString = queryString + printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString)

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  // createNewUserHeroes: function(table, cols, vals, cb) {
  //   var queryString = 'INSERT INTO ' + table;

  //   queryString += ' (plantTypes, asset, cost, energy, isSunProducer, isShooter, isExploding, sunFrequency, shootingFrequency, damage, userId) ';
  //   queryString += 'VALUES';
  //   queryString += ' (';
  //   queryString = queryString + printQuestionMarks(vals.length);
  //   queryString += ')';
  //   queryString += ', ';
  //   queryString += '(';
  //   queryString = queryString + printQuestionMarks(vals.length);
  //   queryString += ') ';

  //   console.log(queryString)

  //   connection.query(queryString, vals, function(err, result) {
  //     if (err) throw err;
  //     cb(result);
  //   });
  // },
  
  createNewUserHeroes: function(table, cols, vals, cb) {
    var queryString = 'INSERT INTO ' + table;
    queryString += ' (plantTypes, asset, cost, energy, isSunProducer, isShooter, isExploding, sunFrequency, shootingFrequency, damage, userId) ';
    queryString += 'VALUES';
    queryString += ' (';
    queryString = queryString + printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString)

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  
  createNewUserEnemies: function(table, cols, vals, cb) {
    var queryString = 'INSERT INTO ' + table;

    queryString += ' (zombieTypes, asset, damage, vx, energy, userId) ';
    queryString += 'VALUES';
    queryString += ' (';
    queryString = queryString + printQuestionMarks(vals.length);
    queryString += ') ';

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  allLevels: function(tableInput, cb) {
    var queryString = 'SELECT * FROM ' + tableInput + ';';
    connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
    });
  },

  allHeroes: function(tableInput, condition, cb) {
    var queryString = 'SELECT * FROM ' + tableInput;
    queryString += ' WHERE ';
    queryString += condition;
    console.log('This is new ' + queryString)
    connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
    });
  },

  allEnemies: function(tableInput, condition, cb) {
    var queryString = 'SELECT * FROM ' + tableInput;
    queryString += ' WHERE ';
    queryString += condition;
    console.log('This is new ' + queryString)
    connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
    });
  },
};

module.exports = orm;