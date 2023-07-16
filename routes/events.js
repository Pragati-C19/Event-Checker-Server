const express = require("express");
const router = express.Router();

//In controller we have write request and response
const {
  getEvents,
  getOneEvent,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../controller/event-controller");

//Get All Events http://localhost:4000/events/
router.get("/", getEvents);

//Get One Event http://localhost:4000/events/id
router.get("/:id", getOneEvent);

//Create a new Event http://localhost:4000/events/
router.post("/", createEvents);

//Update Event http://localhost:4000/events/id
router.put("/:id", updateEvents);

//Delete Event
router.delete("/:id", deleteEvents);

//Export all routers from here
module.exports = router;
