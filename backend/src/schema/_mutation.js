const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const { UserResponse } = require('./_types');
const UserBl = require('../business/user-bl');
const { verifyJwt } = require('../utils/jwt-helper');

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    signin: {
      type: UserResponse,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parentValue, { email, password }, { res }) {
        return await new UserBl().signIn({ email, password }, res);
      }
    },
    signup: {
      type: UserResponse,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
        locale: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(
        parentValue,
        { firstName, lastName, email, password, phone, locale },
        { res }
      ) {
        return await new UserBl().signUp(
          { firstName, lastName, email, password, phone, locale },
          res
        );
      }
    },
    signout: {
      type: UserResponse,
      async resolve(parentValue, args, { req, res }) {
        const userId = await verifyJwt(req);
        return await new UserBl().signOut(userId, res);
      }
    }
  }
});

module.exports = mutation;
