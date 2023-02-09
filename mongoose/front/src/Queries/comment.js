import { gql } from "@apollo/client";

const comment = {
  CREATE_COMMENT: gql`
    mutation createComment($postId: ID!, $user: String!, $content: String!) {
      writeComment(postId: $postId, user: $user, content: $content) {
        id
      }
    }
  `,

  UPDATE_COMMENT: gql`
    mutation updateComment($commentId: ID!, $content: String!) {
      updateComment(commentId: $commentId, content: $content) {
        id
      }
    }
  `,

  DELETE_COMMENT: gql`
    mutation deleteComment($commentId: ID!) {
      deleteComment(commentId: $commentId) {
        response
      }
    }
  `,
};

export default comment;
