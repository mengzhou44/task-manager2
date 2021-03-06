const jwt = require('jsonwebtoken');

const UserBl = require('../business/user-bl');

const auth = async (req, res, next) => {
  try {
    if (req.header('authorization')) {
      const token = req.header('authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = await new UserBl().findById(decoded.userId);
    }
    
  } finally {
    next();
  }
};

const authenticate = req => {
  if (req.user === undefined) {
    throw new Error('User is not authenticated!');
  }
};

module.exports = { auth, authenticate };
