const graphql = require('graphql');
const { GraphQLList, GraphQLInt, GraphQLNonNull } = graphql;

const { TaskType } = require('../_types');

const TaskBl = require('../../business/task-bl');

const tasks = {
  type: new GraphQLList(TaskType),
  args: {
    userId: { type: new GraphQLNonNull(GraphQLInt) }
  },
  async resolve(parentValue, args) {
    return await new TaskBl().getTasks(args.userId);
  }
};

module.exports = tasks;
