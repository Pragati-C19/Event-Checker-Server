//All request and response for events wrote here

//DB Connection
const connection = require("../database/db-connection");

// let { events } = require("../events");

//Get All Events
const getEvents = (req, res) => {
  connection.query("SELECT * FROM event_table", (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
      return;
    }
    console.log("Result:", results);
    res.json({ results });
  });
};

//Get specific event by ID
const getOneEvent = (req, res) => {
  const eventId = req.params.id;

  connection.query(
    "SELECT * FROM event_table WHERE event_id = ?",
    [eventId],
    (error, results) => {
      if (error) {
        console.error("Error executing the query:", error);
        res
          .status(500) //500 (Internal Server Error)
          .json({ error: "Error executing the query" });
      } else {
        if (results.length === 0) {
          //results array is empty meaning no records were returned by the query
          res.status(404).json({ error: "Event not found" }); //404 (Not Found)
        } else {
          // const event = results[0];           //query is designed to retrieve a single event by its ID, this line ensures that only the first record is used.
          // res.json(event);

          //if we don't want to use [0] then also it's ok nothing change in this code.
          console.log("Result:", results);
          res.json(results);
        }
        // console.log("Result:", results);
        // res.json({ results });
      }
    }
  );
};

const createEvents = (req, res) => {
  const { title } = req.body;
  if (title) {
    return res.status(201).json({ success: true, eventTitle: title });
  }
  res.status(400).send({ success: false, msg: "Please Provide Valid Name" });
};

const updateEvents = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  console.log(id, title);

  const event = events.find((person) => person.id === Number(id));
  const newevents = events.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  if (person) {
    return res.status(201).json({ success: true, data: newevents });
  }
  res.status(400).send({ success: false, msg: `No Person with ID  ${id}` });
};

const deleteEvents = (req, res) => {
  const person = events.find((person) => person.id === Number(req.params.id));
  const newevents = events.filter(
    (person) => person.id !== Number(req.params.id)
  );
  if (person) {
    return res.status(200).json({ success: true, data: newevents });
  }
  res
    .status(400)
    .send({ success: false, msg: `No Person with ID  ${req.params.id}` });
};

module.exports = {
  getEvents,
  getOneEvent,
  createEvents,
  updateEvents,
  deleteEvents,
};
