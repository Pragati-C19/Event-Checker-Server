const express = require("express");
const router = express.Router();

//In controller we have write request and response
const { registerUsers, loginUsers } = require("../controller/user-controller");

//User Registration http://localhost:4000/users/register
router.post("/register", registerUsers);

//User Login http://localhost:4000/users/login
router.post("/login", loginUsers);

//Export all userrouters from here
module.exports = router;
