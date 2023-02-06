import { Schema, model, Types } from "mongoose";

const PostSchema = new Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true },
    content: String,
    comments: [
      {
        _id: { type: Types.ObjectId, required: true },
        user: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Post = model("post", PostSchema);
export default Post;
