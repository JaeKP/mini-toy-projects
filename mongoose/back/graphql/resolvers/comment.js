import mongoose from "mongoose";
import { Post, Comment } from "../../models/index.js";

export default {
  Mutation: {
    /**
     * 댓글 작성
     * @param : postId!, user!, content!
     * @returns : Comment
     */
    writeComment: async (_, { postId, user, content }) => {
      try {
        const post = await Post.findById(postId);
        const comment = new Comment({ user, content, post });
        await Promise.all([comment.save(), Post.updateOne({ _id: postId }, { $push: { comments: comment } })]);
        return comment;
      } catch (error) {
        console.log(error);
        throw new Error("error");
      }
    },

    /**
     * 댓글 수정
     * @param : commentId!, content!
     * @returns : Comment
     */
    updateComment: async (_, { commentId, content }) => {
      try {
        const [comment] = await Promise.all([
          Comment.findOneAndUpdate({ _id: commentId }, { content }, { new: true }),
          Post.updateOne({ "comments._id": commentId }, { "comments.$.content": content }),
        ]);
        return comment;
      } catch (error) {
        console.log(error);
        throw new Error("error");
      }
    },

    /**
     * 댓글 삭제
     * @param : commentId!
     * @returns : {response: Boolean}
     */
    deleteComment: async (_, { commentId }) => {
      try {
        await Promise.all([
          Comment.findOneAndDelete({ _id: commentId }),
          Post.updateOne({ "comments._id": commentId }, { $unset: { "comments.$": 1 } }),
        ]);
        return { response: true };
      } catch (error) {
        console.log(error);
        throw new Error("error");
      }
    },
  },
};
