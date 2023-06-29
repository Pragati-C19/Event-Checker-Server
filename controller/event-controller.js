//All request and response for events wrote here

//DB Connection
const connection = require("../database/db-connection");

// let { events } = require("../events");

//Get All Events
const getEvents = (req, res) => {
  //sql query to show full table
  const getEventsQuery = "SELECT * FROM event_table";

  connection.query(getEventsQuery, (error, results) => {
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
  //Extract ID from request parameter
  const eventId = req.params.id;

  //sql query to find event_id
  const getOneEventQuery = "SELECT * FROM event_table WHERE event_id = ?";

  connection.query(getOneEventQuery, [eventId], (error, results) => {
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
  });
};

const createEvents = (req, res) => {

  //res.json(req.body);

  // Extract data from the request body
  const {
    title,
    description,
    type_of_event,
    start_date,
    end_date,
    visibility,
  } = req.body;

  // Get the current timestamp for updated_at and created_at
  const currentTimestamp = new Date().toISOString();

  // sql query to save the event to the database
  const createEventQuery =
    "INSERT INTO events (title, description, type_of_event, start_date, end_date, visibility, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  // values that should affect respectively
  const createEventValues = [
    title,
    description,
    type_of_event,
    start_date,
    end_date,
    visibility,
    currentTimestamp,
    currentTimestamp,
  ];

  connection.query(createEventQuery, createEventValues, (error, results) => {
    if (error) {
      console.error("Error creating event:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the event" });
    } else {
      res.status(201).json({ message: "Event created successfully" });
    }
  });
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
