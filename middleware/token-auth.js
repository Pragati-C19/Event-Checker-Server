const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  /*
    Token is going to come from header(Authorization)
    authorization header format was "Bearer TOKEN"
    We can directly use token instead of adding Bearer
 */
  const authHeader = req.headers["authorization"];
  const token = authHeader;

  const emptyValues = ["", null, undefined];

  // Check if the user is authenticated
  if (emptyValues.includes(token)) {
    //TODO Change all status code format as this one
    res.status(200).json({ statusCode: 401, statusMsg: "Unauthorized" });
  } else {
    //if we have a token we need to verify that token
    //this user_id is used in mysql table
    jwt.verify(token, process.env.JWT_SECRET, (err, user_id) => {
      if (err) return res.status(403).send("You Don't have access");
      req.user_id = user_id;
      next(); // Continue to the next middleware or route handler
    });
  }
}

module.exports = { authenticateToken };
