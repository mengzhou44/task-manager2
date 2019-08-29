const jwt = require('jsonwebtoken');
 
const signToken = userId => {
  return new Promise(resolve => {
    resolve(jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: '7d' }));
  });
};

 

module.exports = signToken;
