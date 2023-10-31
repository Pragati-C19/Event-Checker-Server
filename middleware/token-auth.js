function authenticateToken(req, res, next) {
  /*
    Token is going to come from header
    authorization header format is "Bearer TOKEN"
 */
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //if we have authHeader then return authHeader token portion we split on the space otherwise just return undefined

  // Check if the user is authenticated
  if (token==null) {
    res.status(401).send("Unauthorized");
  } else {
    //if we have a token we need to verify that token 
    jwt.verify(token, process.env.JWT_SECRET, (err, userID) => {
        if(err) return res.status(403).send("You Don't have access")
        req.userID=userID;
        next(); // Continue to the next middleware or route handler
    });
  }
}

module.exports = { authenticateToken };
