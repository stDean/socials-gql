export const typeDefs = `
  type Post {
    id: ID!
    body: String! 
    createdAt: String! 
    username: String!
  }

  type User {
    id: ID! 
    token: String! 
    email: String! 
    username: String! 
    createdAt: String! 
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    registerUser(registerInput: RegisterInput!): User!
    loginUser(loginInput: LoginInput!): User!
  }
`;
