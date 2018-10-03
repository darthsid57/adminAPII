var mysql = require('mysql');

// connection to MySQL DB
var myConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'traseable'
});

myConnection.connect(function(err){
    if (err) throw err;
});

module.exports = myConnection;