const jwt = require('jsonwebtoken');

const UserBl = require('../business/user-bl');

const authenticate = async req => {
  const token = req.header('Authorization').replace('Bearer ', '');
 
  return new Promise((resolve, reject)=> {
    if (token === undefined) {
       resolve(null);
    } else {
        jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
            if (!error) {
              const userId = decoded.userId;
              resolve(await new UserBl().findById(userId));
            } else {
                resolve(null);
            }
          });
    }
  });
  
};

module.exports = authenticate;
