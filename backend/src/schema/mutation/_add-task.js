const { GraphQLNonNull, GraphQLBoolean, GraphQLString, GraphQLInt} = require('graphql');

const TaskBl = require("../../business/task-bl");
const types = require("../_types");


const signIn =  {
    type: types.TaskType,
    args: {
    
      description: { type: new GraphQLNonNull(GraphQLString) },
      completed: { type: new GraphQLNonNull(GraphQLBoolean) },
      userId: { type: new GraphQLNonNull(GraphQLInt) },
      
    },
    async resolve(parentValue, { description, completed, userId }) {
      return await new TaskBl().addTask({ description, completed, userId });
    }
  };

module.exports = signIn;
