import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    writeComment(postId: ID!, user: String!, content: String!): Comment
    updateComment(commentId: ID!, content: String!): Comment
    deleteComment(commentId: ID!): Response
  }

  type Comment {
    id: ID!
    user: String!
    content: String!
  }
`;
