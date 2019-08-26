const graphql = require('graphql');

const UserBl = require('../business/user-bl');
const { UserType} = require('./_types');

const { verifyJwt } = require('../utils/jwt-helper');

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull
} = graphql;

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parentValue, args, { req }) {
        await verifyJwt(req);
        return await new UserBl().findById(args.id);
      }
    }
  }
});

module.exports = query;
