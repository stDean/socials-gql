import Post from "../../../server/models/post.model.js";

export const postResolver = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find({});
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
