const graphql = require('graphql');
const { GraphQLObjectType} = graphql;

 
const UserBl = require('../../business/user-bl');
const signIn = require("./_sign-in");  
const signUp = require("./_sign-up"); 

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    signIn,
    signUp
  }
});

module.exports = mutation;
