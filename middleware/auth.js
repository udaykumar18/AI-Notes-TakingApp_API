// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const TOKEN = process.env.JWT_SECRET || "udaykumar";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, TOKEN);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid authentication token" });
  }
};

module.exports = auth;
