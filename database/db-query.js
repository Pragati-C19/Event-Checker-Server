const mysql = require("mysql2");
const config = require("../database/db-config");

const connection = mysql.createConnection(config.db);

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");

  // Execute a sample query
  connection.query("SELECT 1 + 1 AS result", (error, results, fields) => {
    if (error) {
      console.error("Error executing the query:", error);
      return;
    }
    console.log("Result:", results[0].result);

    // Close the connection
    // connection.end((err) => {
    //   if (err) {
    //     console.error("Error closing the database connection:", err);
    //     return;
    //   }
    //   console.log("Database connection closed.");
    // });
  });

 
});

module.exports = connection;
