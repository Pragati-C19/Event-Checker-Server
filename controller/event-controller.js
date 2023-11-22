//All request and response for events wrote here

//DB Connection
const connection = require("../database/db-connection");

//Get All Events
const getEvents = (req, res) => {
  const userID = req.user_id;
  //TODO Add console logs like this for userID and EventID
  console.log("getEvents", { userID });

  //sql query to show full table
  const getEventsQuery =
    "SELECT * FROM event_table WHERE visibility = 'PUBLIC' OR (visibility = 'PRIVATE' AND user_id = ?)";

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
  const userID = req.user_id;
  console.log("getOneEVENTuPDATE", { eventId, userID });

  //sql query to find event_id
  const getOneEventQuery =
    "SELECT * FROM event_table WHERE event_id = ?";

  const values = [eventId, userID];

  connection.query(getOneEventQuery, values, (error, results) => {
    if (error) {
      console.error("Error executing the query:", error);
    } else {
      if (results.length === 0) {
        //results array is empty meaning no records were returned by the query
        console.log("getOneEvent 404 error statement", { eventId, userID, results });
        res.status(200).json({ statusCode: 404, statusMsg: "Event not Found" });
      } else {
        const event = results[0]; //query is designed to retrieve a single event by its ID, this line ensures that only the first record is used.
        console.log(event);
        //TODO For debugging
        console.log("Event Visibility1:", event.visibility);
        console.log("Event User ID1:", event.user_id);
        console.log("Authenticated User ID1:", userID);
        // Check the visibility and user_id for further logic
        if (event.visibility === "PUBLIC") {
          // Handle logic for public events
          console.log("getOneEvent if statement", { eventId, userID });
          //TODO For debugging
          console.log("Event Visibility2:", event.visibility);
          console.log("Event User ID2:", event.user_id);
          console.log("Authenticated User ID2:", userID);

          res.json(event);
        } else if (event.visibility === "PRIVATE" && event.user_id == userID) {
          // Handle logic for private events for the authenticated user
          console.log("getOneEvent if-else statement", { eventId, userID });
          //TODO For debugging
          console.log("Event Visibility3:", event.visibility);
          console.log("Event User ID3:", event.user_id);
          console.log("Authenticated User ID3:", userID);
          res.json(event);
        } else {
          // User does not have permission for the event
          res.status(200).json({
            statusCode: 403,
            error: "User does not have permission for the event",
          });
        }

        //if we don't want to use [0] then it's ok nothing change in this code.
        // console.log("Result:", results);
        //res.json(results);
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
  const userID = req.user_id;
  console.log("updateEvents", { eventId, userID });

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
  const updateEventsQuery = `UPDATE event_table SET title = ?, description = ?, type_of_event = ?, start_date = ?, end_date = ?, visibility = ?, updated_at = NOW() WHERE event_id = ? AND user_id = ?`;
  const values = [
    title,
    description,
    type_of_event,
    start_date,
    end_date,
    visibility,
    eventId,
    userID,
  ];

  connection.query(updateEventsQuery, values, (error, results) => {
    if (error) {
      console.error("Error while executing the query:", error);
    } else {
      res
        .status(200)
        .json({ statusCode: 201, statusMsg: "Event updated successfully" });
    }
  });
};

const deleteEvents = (req, res) => {
  const eventId = req.params.id;
  const userID = req.user_id;
  console.log("deleteEvents", { eventId, userID });

  // Delete the event with the specified ID from the database
  const deleteEventsQuery =
    "DELETE FROM event_table WHERE event_id = ? AND user_id = ?";
  const values = [eventId, userID];

  connection.query(deleteEventsQuery, values, (error) => {
    if (error) {
      console.error("Error executing the query:", error);
      return;
    } else {
      res
        .status(200)
        .json({ statusCode: 201, statusMsg: "Event deleted successfully" });
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
