const { UserType } = require('../_types');
const { authenticate } = require('../../utils/auth');
const user = {
  type: UserType,
  async resolve(parentValue, args, { req }) {
    authenticate(req);
    return req.user;
  }
};

module.exports = user;
