const graphql = require('graphql');

const { GraphQLSchema } = graphql;

const query = require('./_query');
const mutation = require('./_mutation');

module.exports = new GraphQLSchema({
  query,
  mutation
});
