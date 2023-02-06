import { Mongoose } from "mongoose";
import post from "./post.js";
import comment from "./comment.js";

export default {
  Query: {
    ...post.Query,
  },
  Mutation: {
    ...post.Mutation,
    ...comment.Mutation,
  },
};
