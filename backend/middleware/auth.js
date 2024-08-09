const jwt = require("jsonwebtoken");

// middleware to check if the user has valid token
const authenticateToken = (req, res, next) => {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "random@123");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Invalid token.");
  }
};

module.exports = authenticateToken;
