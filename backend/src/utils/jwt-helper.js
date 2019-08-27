const jwt = require('jsonwebtoken');

const signToken = userId => {
  return new Promise(resolve => {
    resolve(jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: '7d' }));
  });
};

const verifyJwt = req => {
  console.log('step1');
  const cookies = req.cookies;

  const token = cookies.id;
  if (token === undefined) {
    throw new Error('401: User is not authenticated');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
      console.log('step2');
      if (error) {
        console.log('step3');
        reject('401: User is not authenticated');
      }
      const userId = decoded.userId;
      resolve(userId);
    });
  });
};

module.exports = { signToken, verifyJwt };
