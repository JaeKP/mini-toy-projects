import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema(
  {
    post: { type: Types.ObjectId, required: true, ref: "post" },
    user: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = model("comment", CommentSchema);

export default Comment;
