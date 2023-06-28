const mysql = require("mysql2");
const config = require("./db-config");

const connection = mysql.createConnection(config.db);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");

  // Close the connection
  // connection.end((err) => {
  //   if (err) {
  //     console.error("Error closing the database connection:", err);
  //     return;
  //   }
  //   console.log("Database connection closed.");
  // });
});

module.exports = connection;
