import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true },
    content: String,
  },
  { timestamps: true }
);

const Post = model("post", PostSchema);
export default Post;
