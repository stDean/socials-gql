import { GraphQLError } from "graphql";
import Post from "../../../server/models/post.model.js";
import { checkAuth } from "../../../server/utils/check-auth.js";

export const commentResolver = {
  Mutation: {
    createComment: async (_, args, contextValue) => {
      const { postId, body } = args;
      const { username } = checkAuth({ context: contextValue });

      if (body.trim() === "") {
        throw new GraphQLError("Comment cannot be empty", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("No post found");
      }

      post.comments.unshift({
        body,
        username,
        createdAt: new Date().toISOString(),
      });

      await post.save();
      return post;
    },
    deleteComment: async (_, args, contextValue) => {
      const { postId, commentId } = args;
      const { username } = checkAuth({ context: contextValue });

      const post = await Post.findById(postId);
      if (!post) {
        throw new Error("No post found");
      }

      const commentIdx = post.comments.findIndex(
        comment => comment.id === commentId
      );
      
      if (post.comments[commentIdx].username === username) {
        post.comments.splice(commentIdx, 1);
        await post.save();
        return post;
      }
    },
  },
};
