import { gql } from "@apollo/client";

const post = {
  GET_POST: gql`
    query getPost {
      getPost {
        id
        user
        title
        content
      }
    }
  `,

  GET_POSTDETAIL: gql`
    query getPostDetail($postId: ID!) {
      getPostDetail(postId: $postId) {
        id
        user
        title
        content
        comments {
          id
          user
          content
        }
      }
    }
  `,

  CREATE_POST: gql`
    mutation createPost($user: String!, $password: String!, $title: String!, $content: String) {
      writePost(user: $user, password: $password, title: $title, content: $content) {
        id
      }
    }
  `,

  UPDATE_POST: gql`
    mutation updatePost($postId: ID!, $password: String!, $title: String, $content: String) {
      updatePost(postId: $postId, password: $password, title: $title, content: $content) {
        id
      }
    }
  `,
  DELETE_POST: gql`
    mutation deletePost($postId: ID!, $password: String!) {
      deletePost(postId: $postId, password: $password) {
        response
      }
    }
  `,
};

export default post;
