import { postResolver } from "./resolver/post.resolver.js";

export const resolvers = {
  Query: {
    ...postResolver.Query,
  },
};
