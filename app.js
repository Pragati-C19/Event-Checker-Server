const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");

// Parse JSON bodies
app.use(bodyParser.json());

//import all event routers here
const eventRouter = require("./routes/events");

//import all User routers here
const userRouter = require("./routes/users");

//routers for http://localhost:4000/events
app.use('/events', eventRouter);

//routers for http://localhost:4000/users
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Event-Checker app listening on port ${port}`);
});
