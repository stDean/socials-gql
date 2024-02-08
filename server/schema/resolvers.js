import { postResolver } from "./resolver/post.resolver.js";
import { userResolver } from "./resolver/user.resolver.js";
import { commentResolver } from "./resolver/comment.resolver.js";

export const resolvers = {
  Post: {
    likeCount: parent => parent.likes.length,
    commentCount: parent => parent.comments.length,
  },
  Query: {
    ...postResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
  },
};
