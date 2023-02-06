import mongoose from "mongoose";
import { Post } from "../../models/index.js";

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
     * @param : username!, title!, content
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
     * @param : username!, title, content
     * @returns : Post
     */
    updatePost: async (_, { postId, title, content }) => {
      console.log(postId);
      try {
        const post = await Post.findById(postId);
        console.log(post);
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
     * @param : postId!
     * @returns : {response : Boolean}
     */
    deletePost: async (_, { postId }) => {
      try {
        const post = await Post.findByIdAndDelete(postId);
        return { response: true };
      } catch (error) {
        console.log(error);
        throw new Error("error");
      }
    },
  },
};
