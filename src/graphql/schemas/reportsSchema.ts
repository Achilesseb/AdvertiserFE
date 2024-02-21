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
        name
      }
      count
    }
  }
`;

export const GET_DRIVERS_REPORTS = gql`
  query GetDriversReports($input: GetDriversReportsTypeInput) {
    getDriversReports(input: $input) {
      data {
        id
        driverName
        totalDistance
        trips
        car
        fleet
      }
      count
    }
  }
`;

export const GET_UNIQUE_DRIVER_REPORTS = gql`
  query GetUniqueDriverReports($input: GetUniqueDriverReportsTypeInput) {
    getUniqueDriverReports(input: $input) {
      data {
        id
        driverName
        totalDistance
        trips
        car
        fleet
        day
      }
      count
    }
  }
`;
