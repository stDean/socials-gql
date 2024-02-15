import { GraphQLError } from "graphql";
import Post from "../../../server/models/post.model.js";
import { checkAuth } from "../../../server/utils/check-auth.js";

export const postResolver = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },
    getPost: async (_, args) => {
      try {
        const { postId } = args;
        const post = await Post.findById({ _id: postId });
        if (!post) {
          throw new Error("Post not found");
        }

        return post;
      } catch (e) {
        throw new Error(e);
      }
    },
  },

  Mutation: {
    createPost: async (_, args, contextValue) => {
      try {
        const { body } = args;
        const user = checkAuth({ context: contextValue });

        if(body.trim() === '') {
          throw new Error("Post body cannot be empty!")
        }

        const post = await Post.Find({
          body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        return post;
      } catch (e) {
        throw new Error(e);
      }
    },
    deletePost: async (_, args, contextValue) => {
      const { postId } = args;
      const user = checkAuth({ context: contextValue });
      try {
        const post = await Post.findOneAndDelete({
          _id: postId,
          username: user.username,
        });

        if (!post) {
          throw new Error("Post not found");
        }

        return "Post Deleted";
      } catch (e) {
        throw new GraphQLError("You cannot delete this post");
        console.log(e);
      }
    },
    likePost: async (_, args, contextValue) => {
      const { postId } = args;
      const { username } = checkAuth({ context: contextValue });

      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("No post found");
        }

        const alreadyLiked = post.likes.find(
          like => like.username === username
        );
        if (alreadyLiked) {
          // unlike the post
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          // like the post
          post.likes.push({ username, createdAt: new Date().toISOString() });
        }

        await post.save();
        return post;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
