const graphql = require('graphql');
const TaskBl = require('../business/task-bl');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean } = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    locale: { type: GraphQLString },
    tasks: {
      type: GraphQLList(TaskType),
      resolve(parentValue, args) {
        return new TaskBl().getTasks(parentValue.id);
      }
    }
  })
});

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLInt },
    description: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    userId: { type: GraphQLInt }
  })
});

const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    token: { type: GraphQLString }
  })
});

module.exports = {
  TaskType,
  UserType,
  TokenType
};
