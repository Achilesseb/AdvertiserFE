import { gql } from "@apollo/client";

export const GET_ALL_TEAMS = gql`
  query GetAllTeams($input: GetAllTeamTypesInput) {
    getAllTeams(input: $input) {
      count
      data {
        id
        city
        teamName
        createdAt
        totalDrivers
        drivers
        totalPromotions
        totalDuration
      }
    }
  }
`;
