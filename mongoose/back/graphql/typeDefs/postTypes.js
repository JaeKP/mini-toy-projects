import { gql } from "apollo-server-express";

export default gql`
  type Query {
    getPost: [Post]
    getPostDetail(postId: ID!): PostDetail
  }

  type Mutation {
    writePost(user: String!, title: String!, content: String): Post
    updatePost(postId: ID!, title: String, content: String): Post
    deletePost(postId: ID!): Response
  }

  type Post {
    id: ID!
    user: String!
    title: String!
    content: String
    createdAt: Date
    updateAt: Date
  }

  type PostDetail {
    id: ID!
    user: String!
    title: String!
    content: String
    createdAt: Date
    updateAt: Date
    comments: [Comment]!
  }
`;
