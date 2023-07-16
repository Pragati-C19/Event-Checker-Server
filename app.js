const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");

// Parse JSON bodies
app.use(bodyParser.json());

//import all event routers here
const eventRouter = require("./routes/events");

//routers for http://localhost:4000/events
app.use("/events", eventRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
