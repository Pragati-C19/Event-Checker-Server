const mysql = require('mysql2');
const config = require('../database/db-config');

const connection = mysql.createConnection(config.db);


module.exports = connection