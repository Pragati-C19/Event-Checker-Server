const express = require("express");
const connection = require("./database/db-query");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  connection.query("SELECT * FROM event_table", (error, results, fields) => {
    if (error) {
      console.error("Error executing the query:", error);
      return;
    }
    console.log("Result:", results);
    res.json({ results });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
