const jwt = require('jsonwebtoken');

const signToken = userId  => {
  return new Promise(resolve => {
    resolve(jwt.sign({ userId }, process.env.JWT_KEY, {expiresIn: '7d'}));
  });
};

const verifyJwt = req => {
  let token;
  if (req.query && req.query.hasOwnProperty('access_token')) {
    token = req.query.access_token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.includes('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token === undefined) {
    throw new Error('401: User is not authenticated');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
      if (error) {
        reject('401: User is not authenticated');
      }
      resolve(decoded);
    });
  });
};

module.exports = { signToken, verifyJwt };
