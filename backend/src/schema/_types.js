const graphql = require('graphql');
const TaskBl = require('../business/task-bl');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;
 
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
    completed: { type: GraphQLString },
    userId: { type: GraphQLInt }
  })
});

const UserResponse = new GraphQLObjectType({
    name: 'UserResponse',
    fields: () => ({
      user: { type: UserType }
    })
  });
   

module.exports = {
     TaskType,
     UserType,
     UserResponse
}