//All request and response for User API wrote here

//DB Connection
const jwt = require("jsonwebtoken");
const connection = require("../database/db-connection");

//Code is showing 'MODULE_NOT_FOUND' error and didn't give token bcoz we haven't call .env function
require("dotenv").config();

//User Registration
const registerUsers = (req, res) => {
  const {
    userID,
    userName,
    emailID,
    password,
    profilePic,
    created_at,
  } = req.body;

  // Insert user data into the MySQL database
  const registerQuery =
    "INSERT INTO user_table (user_id, username, email_id, password, profile_pic, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
  connection.query(
    registerQuery,
    [userID, userName, emailID, password, profilePic, created_at],
    (error, results) => {
      if (error) {
        console.error("Error registering user in MySQL:", error);
        //Internal Server Error
        res.status(500).json({ statusCode: 500, error: "Registration failed" });
      } else {
        res
          .status(201)
          .json({ statusCode: 201, message: "User registered successfully" });
      }
      console.log("[INFO] registerQuery: ", results);
    }
  );
};

//User Login
const loginUsers = (req, res) => {
  const { emailID, password } = req.body;
  console.log("[INFO] loginUser: email_id and Password => ", emailID, password);

  // Retrieve user data from the database based on the provided email
  const loginQuery = "SELECT * FROM user_table WHERE email_id = ?";

  connection.query(loginQuery, [emailID], (error, results) => {
    if (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ statusCode: 500, error: "Internal server error" });
    } else {
      if (results.length === 0) {
        // User with the provided email not found
        res.status(404).json({ statusCode: 404, error: "User not found" });
      } else {
        // User found, check password
        const user = results[0];
        console.log(user)

        // Compare the provided password with the stored password (plaintext)
        if (password === user.password) {
          // Passwords match, user is authenticated
          user.password = null
          console.log(user)

          //JWT Token Code
          const jwtToken = jwt.sign(user.user_id, process.env.JWT_SECRET);
          res.status(200).json({
            statusCode: 200,
            message: "Login successful",
            accessToken: jwtToken,
          });
          
          //res.status(200).json({ statusCode: 200, message: "Login successful", user });
        } else {
          // Passwords do not match : Authentication failed
          res
            .status(401)
            .json({ statusCode: 401, error: "Authentication failed" });
        }
      }
    }
  });
};

module.exports = { registerUsers, loginUsers };
