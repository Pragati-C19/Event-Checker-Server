
function authenticate(req, res, next) {
    // Check if the user is authenticated
    if (userIsAuthenticated) {
      next(); // Continue to the next middleware or route handler
    } else {
      res.status(401).send('Unauthorized');
    }
}

module.exports = {authenticate}