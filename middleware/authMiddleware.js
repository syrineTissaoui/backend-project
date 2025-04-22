const jwt = require('jsonwebtoken');
const User = require('../models/user'); // assuming you have a user model

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    try {
      console.log('decoded',decoded);
      console.log('decoded.userId',decoded.userId);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      req.user = user; // attach the user object to the request
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error.' });
    }
  });
};

module.exports = authenticateToken;
