var mysql = require("mysql");
require('dotenv').config()

var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Au98gust98!',
    database: 'burgers_db'
  });
};

connection.connect();
module.exports = connection;