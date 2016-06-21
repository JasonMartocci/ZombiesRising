/*
Here is where you make the connection to the database and export and used by the O.R.M.
*/
var mysql = require('mysql');
var connection;

// if (process.env.JAWSDB_URL){
//     connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//     connection = mysql.createConnection({
//         host: 'l9dwvv6j64hlhpul.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//         user: 'ub54aebuuk82ex6v',
//         password: 'ozawdqjfz6zrtjwc',
//         database: 'wvmi1gdy2pdcftqh',
//     });
// }

if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'q3vtafztappqbpzn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'atx25vztl8a2yiln',
        password: 'u7psjf4mpxp5gk5p',
        database: 'hw4a09i5lzuol9lk',
    });
}

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;
