import mongoose from "mongoose";
import { Post, Comment } from "../../models/index.js";
import bcrypt from "bcrypt";

export default {
  Query: {
    /**
     * 모든 포스트를 요청 (최신순 10개)
     * @params : 없음
     * @returns : [Post]
     */
    getPost: async () => {
      try {
        const posts = await Post.find({}).sort({ _id: -1 }).limit(10);
        return posts;
      } catch (error) {
        console.log(error);
        throw new Error("error");
      }
    },

    /**
     * 특정 iD의 포스트의 상세 정보를 요청
     * @param : postId
     * @returns : Post
     */
    getPostDetail: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (!post) return new Error("Incorrect postId");

        return post;
      } catch (error) {
        console.log(error);
        throw new Error("error");
      }
    },
  },
  Mutation: {
    /**
     * 포스트 작성
     * @param : username!,password!, title!, content
     * @returns : Post
     */
    writePost: async (_, args) => {
      try {
        const newPost = new Post(args);
        await newPost.save();
        return newPost;
      } catch (error) {
        console.log(error);
        throw new Error("error");
      }
    },

    /**
     * 포스트 수정
     * @param : username!, password!, title, content
     * @returns : Post
     */
    updatePost: async (_, { postId, password, title, content }) => {
      try {
        const post = await Post.findById(postId);
        if (!post) return new Error("Incorrect postId");

        // 비밀번호 검사
        const isMatch = await bcrypt.compare(password, post.password);
        if (!isMatch) return new Error("Incorrect password");

        // 데이터 수정
        if (title) post.title = title;
        post.content = content;
        await post.save();
        return post;
      } catch (error) {
        console.log(error);
        throw new Error("error");
      }
    },

    /**
     * 포스트 삭제
     * @param : postId!, password!
     * @returns : {response : Boolean}
     */
    deletePost: async (_, { postId, password }) => {
      try {
        const post = await Post.findById(postId);
        if (!post) return new Error("Incorrect postId");

        // 비밀번호 검사
        const isMatch = await bcrypt.compare(password, post.password);
        if (!isMatch) return new Error("Incorrect password");

        // 삭제
        await Post.deleteOne({ _id: postId });
        await Comment.deleteMany({ post: postId });
        return { response: true };
      } catch (error) {
        console.log(error);
        throw new Error("error");
      }
    },
  },
};
