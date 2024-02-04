import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    body: String,
    username: String,
    comments: [
      {
        body: String,
        username: String,
      },
    ],
    likes: [{ username: String }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
