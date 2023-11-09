//All request and response for events wrote here

//DB Connection
const connection = require("../database/db-connection");

//Get All Events
const getEvents = (req, res) => {
  //sql query to show full table
  const userID = req.user_id;
  console.log("getEvents",{userID})

  const getEventsQuery = "SELECT * FROM event_table WHERE visibility = 'PUBLIC' OR (visibility = 'PRIVATE' AND user_id = ?)";

  connection.query(getEventsQuery, userID, (error, results) => {
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

        //if we don't want to use [0] then it's ok nothing change in this code.
        console.log("Result:", results);
        res.json(results);
      }
    }
  });
};

//Create a new Event
const createEvents = (req, res) => {
  console.log(req.body);

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
  /*
        new Date(): This creates a new instance of the Date object, representing the current date and time.

        .toISOString(): The toISOString() method is called on the Date object. It returns a string representation of the date and time in the ISO 8601 format, such as "2023-06-29T07:35:33.943Z".

        .substring(0, 19): The substring() method is used to extract a portion of the ISO 8601 string. In this case, it extracts the characters from index 0 to 18, which represent the date and time portion without the milliseconds. This results in a string like "2023-06-29T07:35:33".

        .replace('T', ' '): The replace() method is used to replace the 'T' character, which separates the date and time, with a space character. This step transforms the string to the format "2023-06-29 07:35:33".  
  */

  const currentTimestamp = new Date()
    .toISOString()
    .substring(0, 19)
    .replace("T", " ");

  // sql query to save the event to the database
  const createEventQuery =
    "INSERT INTO event_table (title, description, type_of_event, start_date, end_date, visibility, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())";

  // values that should affect respectively
  const createEventValues = [
    title,
    description,
    type_of_event,
    start_date,
    end_date,
    visibility,
  ];

  connection.query(createEventQuery, createEventValues, (error, results) => {
    //res.status(any status code like 200 404 500) this status code are Network status code not internal status code.
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

//Update a specific event by ID
const updateEvents = (req, res) => {
  const eventId = req.params.id;
  console.log("[INFO] updateEvents: eventId => ", eventId);
  // Extract updated data from the request body
  const {
    title,
    description,
    type_of_event,
    start_date,
    end_date,
    visibility,
  } = req.body;

  // Perform validation on the data if needed

  // Update the event with the specified ID in the database
  const updateEventsQuery = `UPDATE event_table SET title = ?, description = ?, type_of_event = ?, start_date = ?, end_date = ?, visibility = ?, updated_at = NOW() WHERE event_id = ?`;
  const values = [
    title,
    description,
    type_of_event,
    start_date,
    end_date,
    visibility,
    eventId,
  ];

  connection.query(updateEventsQuery, values, (error, results) => {
    if (error) {
      console.error("Error updating event:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the event" });
    } else {
      res.status(201).json({ message: "Event updated successfully" });
    }
  });
};

const deleteEvents = (req, res) => {
  const eventId = req.params.id;
  const userID = req.user_id;
  console.log("deleteEvents",{eventId, userID})
  
  // Delete the event with the specified ID from the database
  const deleteEventsQuery = "DELETE FROM event_table WHERE event_id = ? AND user_id = ?";
  const values = [eventId, userID];

  connection.query(deleteEventsQuery, values, (error, results) => {
    if (error) {
      console.error("Error deleting event:", error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the event" });
    } else {
      res.status(201).json({ message: "Event deleted successfully" });
    }
  });
};

module.exports = {
  getEvents,
  getOneEvent,
  createEvents,
  updateEvents,
  deleteEvents,
};
