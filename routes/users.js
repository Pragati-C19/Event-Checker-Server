const express = require("express");
const router = express.Router();

//In controller we have write request and response
const {createUsers} = require("../controller/user-controller");

//Create a new User http://localhost:4000/users/register
router.post("/register", createUsers);


// //Get All Users 
// userrouter.get("/", getUsers);

// //Get One User 
// userrouter.get("/:id", getOneUser);

// //Update User 
// userrouter.put("/:id", updateUsers);

// //Delete User 
// userrouter.delete("/:id", deleteUsers);

//Export all userrouters from here
module.exports = router;
