
const mysql = require('mysql');
require('dotenv').config();

let mysql_data = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.NAME
};
const connection = mysql.createConnection(mysql_data);
connection.connect();

module.exports = connection;