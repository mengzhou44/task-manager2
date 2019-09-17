const graphql = require('graphql');
const user = require('./user');
const tasks = require('./tasks');

const { GraphQLObjectType } = graphql;

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user,
    tasks
  }
});

module.exports = query;
