const graphql = require('graphql');
const user = require('./user');

const { GraphQLObjectType } = graphql;

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user
  }
});

module.exports = query;
