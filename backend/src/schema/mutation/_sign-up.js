const { GraphQLNonNull, GraphQLString } = require('graphql');

const UserBl = require('../../business/user-bl');

const types = require('../_types');

const signUp = {
  type: types.TokenType,
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
    { firstName, lastName, email, password, phone, locale }
  ) {
    return await new UserBl().signUp({
      firstName,
      lastName,
      email,
      password,
      phone,
      locale
    });
  }
};

module.exports = signUp;
