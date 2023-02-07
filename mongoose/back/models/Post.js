import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";

const PostSchema = new Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true },
    content: String,
    password: { type: String, required: true },
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

// 암호화 (save 메소드가 실행되기 전에 실행한다.)
PostSchema.pre("save", async function (next) {
  const post = this;
  if (!post.isModified("password")) return next();
  post.password = await bcrypt.hash(post.password, 10);
  next();
});

const Post = model("post", PostSchema);
export default Post;
