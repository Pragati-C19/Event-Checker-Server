const express = require("express");
const router = express.Router();

//In controller we have write request and response 
const {
  getEvents,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../controller/event-controller");

//Get All Events
router.get("/", getEvents);

//Get One Event
router.get("/:id", getEvents);

//Create a new Event
router.post("/", createEvents);

//Update Event
router.put("/:id", updateEvents);

//Delete Event
router.delete("/:id", deleteEvents);


//Export all routers from here 
module.exports = router;