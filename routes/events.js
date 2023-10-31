const express = require("express");
const router = express.Router();
const authenticatedToken = require("../middleware/token-auth");

//In controller we have write request and response
const {
  getEvents,
  getOneEvent,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../controller/event-controller");

//Get All Events http://localhost:4000/events/all
router.get("/all",  getEvents);

//Get One Event http://localhost:4000/events/id
router.get("/:id", authenticatedToken.authenticateToken, getOneEvent);

//Create a new Event http://localhost:4000/events/create
router.post("/create", createEvents);

//Update Event http://localhost:4000/events/update/id
router.put("/update/:id", updateEvents);

//Delete Event http://localhost:4000/events/delete/id
router.delete("/delete/:id", deleteEvents);

//Export all routers from here
module.exports = router;
