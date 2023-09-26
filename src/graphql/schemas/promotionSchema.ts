import { gql } from "@apollo/client";

export const GET_ALL_PROMOTIONS = gql`
  query Query($input: GetAllPromotionsInput) {
    getAllPromotions(input: $input) {
      count
      data {
        id
        title
        description
        url
        duration
        category
        fileName
      }
    }
  }
`;

export const GET_PROMOTION_BY_ID = gql`
  query GetPromotionById($id: String!) {
    getPromotionById(id: $id) {
      id
      title
      description
      url
      duration
      category
      fileName
      client {
        id
        name
        contactEmail
        phone
        address
        cui
        city
        createdAt
      }
    }
  }
`;

export const ADD_NEW_PROMOTION = gql`
  mutation AddNewPromotion($input: AddPromotionInput) {
    addNewPromotion(input: $input) {
      id
      title
      description
      url
      duration
      category
      fileName
      client {
        id
        name
        contactEmail
        phone
        address
        cui
        city
        createdAt
      }
    }
  }
`;

export const EDIT_PROMOTION = gql`
  mutation EditPromotion($input: EditPromotionInput) {
    editPromotion(input: $input) {
      id
      title
      description
      url
      duration
      category
      fileName
      client {
        id
        name
        contactEmail
        phone
        address
        cui
        city
        createdAt
      }
    }
  }
`;
export const DELETE_PROMOTIONS = gql`
  mutation Mutation($promotionIds: [String]!) {
    deletePromotion(promotionIds: $promotionIds)
  }
`;

export const ADD_NEW_PROMOTION_TO_TEAM = gql`
  mutation AddNewPromotionToTeam($input: AddPromotionToTeamInput) {
    addNewPromotionToTeam(input: $input) {
      id
      title
      description
      url
      duration
      category
      fileName
    }
  }
`;

export const DELETE_PROMOTIONS_FROM_TEAMS = gql`
  mutation DeletePromotionsFromTeam($promotionIds: [String]!) {
    deletePromotionsFromTeam(promotionIds: $promotionIds) {
      count
    }
  }
`;
