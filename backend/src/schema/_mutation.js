const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const { SignInResponse } = require('./_types');
const UserBl = require('../business/user-bl');

const {
  GraphQLBoolean
} = graphql;

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    signin: {
      type: SignInResponse,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parentValue, { email, password }, { res }) {
        return await new UserBl().signIn({ email, password }, res);
      }
    },
    signout: {
      type:  GraphQLBoolean,   
      async resolve(parentValue, args, { res }) {
        return await new UserBl().signOut(res);
      }
    },
  }
});

module.exports = mutation;
