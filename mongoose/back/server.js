import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import { resolvers, typeDefs } from "./graphql/index.js";
import cors from "cors";

dotenv.config();
const PASSWORD = process.env.PASSWORD;

const app = express();
const MONGO_URI = `mongodb+srv://worudp12:${PASSWORD}@cluster0.oewr1vv.mongodb.net/Community?retryWrites=true&w=majority`;

const server = async () => {
  try {
    mongoose.set("strictQuery", false);
    let mongodbConnection = await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // ApolloServer 구축
    const server = new ApolloServer({ cors: { origin: "*" }, typeDefs, resolvers });
    await server.start();

    // 미들웨어
    app.use(express.json());
    app.use(cors());
    server.applyMiddleware({ app });

    const httpServer = createServer(app);
    httpServer.listen({ port: 8000 }, () => console.log("server start 🎉: http://localhost:8000/graphql"));
  } catch (error) {
    console.log(error);
  }
};

server();
