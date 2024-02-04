export const typeDefs = `
  type Post {
    id: ID!
    body: String! 
    createdAt: String! 
    username: String!
  }

  type Query {
    getPosts: [Post]
  }
`;
