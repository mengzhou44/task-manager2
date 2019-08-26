const graphql = require('graphql');

const UserBl = require('../business/user-bl');
const TaskBl = require('../business/task-bl');

const { verifyJwt } = require('../utils/jwt-helper');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} = graphql;

const SignInResponse = new GraphQLObjectType({
    name: 'SignInResponse',
    fields: () => ({
      user: { type: UserType }
    })
  });

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      async resolve(parentValue, args, req) {
        await verifyJwt(req);
        return new UserBl().findById(args.id);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    signin: {
      type: SignInResponse,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parentValue, { email, password }) {
        return new UserBl().signIn({ email, password });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
