const express = require("express");
const app = express();
const eventRouter = require("./routes/events");
const port = 4000;

// app.get("/", (req, res) => {
//   connection.query("SELECT * FROM event_table", (error, results) => {
//     if (error) {
//       console.error("Error executing the query:", error);
//       return;
//     }
//     console.log("Result:", results);
//     res.json({ results });
//   });
// });

//router for /events
app.use("/events", eventRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
