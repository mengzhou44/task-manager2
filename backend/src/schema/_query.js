const graphql = require('graphql');
const { UserType } = require('./_types');

const authenticate = require('../utils/authenticate');

const { GraphQLObjectType } = graphql;

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      async resolve(parentValue, args, { req }) {
        return await authenticate(req);
      }
    }
  }
});

module.exports = query;
