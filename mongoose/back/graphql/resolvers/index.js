import { Mongoose } from "mongoose";
import post from "./post.js";

export default {
  Query: {
    ...post.Query,
  },
  Mutation: {
    ...post.Mutation,
  },
};
