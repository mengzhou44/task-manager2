const { GraphQLNonNull, GraphQLString} = require('graphql');

const UserBl = require("../../business/user-bl");
const types = require("../_types");


const signIn =  {
    type: types.TokenType,
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parentValue, { email, password }) {
      return await new UserBl().signIn({ email, password });
    }
  };

module.exports = signIn;
