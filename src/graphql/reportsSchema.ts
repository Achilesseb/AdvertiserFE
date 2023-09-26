import { gql } from "@apollo/client";

export const GET_CLIENTS_REPORTS = gql`
  query GetClientReports($input: GetClientReportsTypeInput) {
    getClientReports(input: $input) {
      data {
        id
        name
        promotionNumber
        tripsNumber
        totalKilometers
      }
      count
    }
  }
`;
export const GET_CLIENTS_PROMOTIONS_REPORTS = gql`
  query GetPromotionsReports($input: GetClientPromotionsTypeInput!) {
    getPromotionsReports(input: $input) {
      data {
        promotionsId
        totalDistance
        clientId
        title
        trips
      }
      count
    }
  }
`;
