import { gql } from "@apollo/client";

export const GET_ALL_CONSTANTS = gql`
  query GetAllConstants($pagination: PaginationArguments) {
    getAllConstants(pagination: $pagination) {
      data {
        id
        constant
        identifier
        inUse
      }
      count
    }
  }
`;

export const DELETE_CONSTANTS = gql`
  mutation DeleteConstants($constantsIds: [String!]!) {
    deleteConstants(constantsIds: $constantsIds)
  }
`;

export const GET_CONSTANT_BY_ID = gql`
  query GetConstant($id: String!) {
    getConstant(id: $id) {
      constant
      identifier
      inUse
    }
  }
`;
export const EDIT_CONSTANT = gql`
  mutation EditConstant($input: EditConstant) {
    editConstant(input: $input) {
      constant
      identifier
      inUse
    }
  }
`;
export const ADD_NEW_CONSTANT = gql`
  mutation AddNewConstant($input: AddConstant) {
    addNewConstant(input: $input) {
      constant
      identifier
      inUse
    }
  }
`;
