import { postResolver } from "./resolver/post.resolver.js";
import { userResolver } from "./resolver/user.resolver.js";

export const resolvers = {
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation
  }
};
