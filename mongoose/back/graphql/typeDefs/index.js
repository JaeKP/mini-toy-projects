import { gql } from "apollo-server-express";
import postTypes from "./postTypes.js";
import commentTypes from "./commentTypes.js";

export default gql`
  scalar Date
  type Response {
    response: Boolean
  }
  ${commentTypes}
  ${postTypes}
`;
