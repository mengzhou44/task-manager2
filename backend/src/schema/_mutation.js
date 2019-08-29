const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const { TokenType } = require('./_types');
const UserBl = require('../business/user-bl');
 
const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    signin: {
      type: TokenType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parentValue, { email, password }) {
        return await new UserBl().signIn({ email, password });
      }
    },
    signup: {
      type: TokenType,
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
        { firstName, lastName, email, password, phone, locale }) {
        return await new UserBl().signUp(
          { firstName, lastName, email, password, phone, locale });
      }
    }
  }
});

module.exports = mutation;
