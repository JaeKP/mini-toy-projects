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
        if (!post) return new Error("Incorrect postId");

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

        if (!comment) return new Error("Incorrect commentId");

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
        const [comment] = await Promise.all([
          Comment.findOneAndDelete({ _id: commentId }),
          Post.updateOne({ "comments._id": commentId }, { $pull: { comments: { _id: commentId } } }),
        ]);

        if (!comment) return new Error("Incorrect commentId");

        return { response: true };
      } catch (error) {
        console.log(error);
        throw new Error("error");
      }
    },
  },
};
