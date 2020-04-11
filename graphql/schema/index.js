const {buildSchema }  = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    password: String
  }

  input UserInput {
    email: String!
    password: String!
  }

  type AudthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type RootQuery {
    login(email:String!, password:String!): AudthData!
  }

  type RootMutation {
    createUser(userInput: UserInput) : User
  }

  schema{
    query: RootQuery
    mutation: RootMutation
  }
`);
