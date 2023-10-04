//All request and response for events wrote here

//DB Connection
const connection = require("../database/db-connection");


//Create a new User
const createUsers = (req, res) => {
    const { userID, userName, emailID, profilePic, created_at, updated_at } = req.body;

    // Insert user data into the MySQL database
    const insertQuery = 'INSERT INTO user_table (userID, userName, emailID, profilePic, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())';
    connection.query(insertQuery, [userID, userName, emailID, profilePic, created_at, updated_at], (error, results) => {
      if (error) {
        console.error('Error registering user in MySQL:', error);
        res.status(500).json({ error: 'Registration failed' });
      } else {
        res.status(201).json({ message: 'User registered successfully' });
      }
    });
};

// //Get All Users
// const getUsers = (req, res) => {
//   //sql query to show full table
//   const getUsersQuery = "SELECT * FROM event_table";

//   connection.query(getUsersQuery, (error, results) => {
//     if (error) {
//       console.error("Error executing the query:", error);
//       return;
//     }
//     console.log("Result:", results);

//     res.json({ results });
//   });
// };

// //Get specific event by ID
// const getOneUser = (req, res) => {
//   //Extract ID from request parameter
//   const eventId = req.params.id;

//   //sql query to find event_id
//   const getOneUserQuery = "SELECT * FROM event_table WHERE event_id = ?";

//   connection.query(getOneUserQuery, [eventId], (error, results) => {
//     if (error) {
//       console.error("Error executing the query:", error);
//       res
//         .status(500) //500 (Internal Server Error)
//         .json({ error: "Error executing the query" });
//     } else {
//       if (results.length === 0) {
//         //results array is empty meaning no records were returned by the query
//         res.status(404).json({ error: "User not found" }); //404 (Not Found)
//       } else {
//         // const event = results[0];           //query is designed to retrieve a single event by its ID, this line ensures that only the first record is used.
//         // res.json(event);

//         //if we don't want to use [0] then also it's ok nothing change in this code.
//         console.log("Result:", results);
//         res.json(results);
//       }
//       // console.log("Result:", results);
//       // res.json({ results });
//     }
//   });
// };

// //Update a specific event by ID
// const updateUsers = (req, res) => {
//   const eventId = req.params.id;
//   // Extract updated data from the request body
//   const {
//     title,
//     description,
//     type_of_event,
//     start_date,
//     end_date,
//     visibility,
//   } = req.body;

//   // Perform validation on the data if needed

//   // Update the event with the specified ID in the database
//   const query = `UPDATE event_table SET title = ?, description = ?, type_of_event = ?, start_date = ?, end_date = ?, visibility = ?, updated_at = NOW(), created_at = NOW() WHERE event_id = ?`;
//   const values = [
//     title,
//     description,
//     type_of_event,
//     start_date,
//     end_date,
//     visibility,
//     eventId,
//   ];

//   connection.query(query, values, (error, results) => {
//     if (error) {
//       console.error("Error updating event:", error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while updating the event" });
//     } else {
//       res.json({ message: "User updated successfully" });
//     }
//   });
// };

// const deleteUsers = (req, res) => {
  
//   const eventId = req.params.id;

//   // Delete the event with the specified ID from the database
//   const query = "DELETE FROM event_table WHERE event_id = ?";
//   const values = [eventId];

//   connection.query(query, values, (error, results) => {
//     if (error) {
//       console.error("Error deleting event:", error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while deleting the event" });
//     } else {
//       res.json({ message: "User deleted successfully" });
//     }
//   });
// };

module.exports = {createUsers};
