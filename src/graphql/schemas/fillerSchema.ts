import { gql } from "@apollo/client";

//If you ever pass around here just don`t ask any questions. It`s just a filler, nothing more.

export const FILLER_QUERY = gql`
  query fillerQuery {
    fillerQuery
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($password: String) {
    resetPassword(password: $password)
  }
`;
