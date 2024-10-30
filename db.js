const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
  host : '127.0.0.1', 
  user : 'root', 
  password : '', 
  PORT : 3306,
  database: 'shopping_app' 
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = db;
