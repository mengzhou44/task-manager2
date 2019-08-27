const graphql = require('graphql');

const UserBl = require('../business/user-bl');
const { UserType } = require('./_types');

const { verifyJwt } = require('../utils/jwt-helper');

const { GraphQLObjectType } = graphql;

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      async resolve(parentValue, args, { req }) {
        const userId = await verifyJwt(req);
        console.log('userId', userId);
        return await new UserBl().findById(userId);
      }
    }
  }
});

module.exports = query;
