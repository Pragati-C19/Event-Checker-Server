const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/token-auth");

//In controller we have write request and response
const {
  getEvents,
  getOneEvent,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../controller/event-controller");

//Get All Events http://localhost:4000/events/all
router.get("/all", authenticateToken, getEvents);

//Get One Event http://localhost:4000/events/id
router.get("/:id", authenticateToken, getOneEvent);

//Create a new Event http://localhost:4000/events/create
router.post("/create", authenticateToken, createEvents);

//Update Event http://localhost:4000/events/update/id
router.put("/update/:id", authenticateToken, updateEvents);

//Delete Event http://localhost:4000/events/delete/id
router.delete("/delete/:id", authenticateToken, deleteEvents);

//Export all routers from here
module.exports = router;
