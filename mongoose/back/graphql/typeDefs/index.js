import { gql } from "apollo-server-express";
import postTypes from "./postTypes.js";

export default gql`
  ${postTypes}
`;
