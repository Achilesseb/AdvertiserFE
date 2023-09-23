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
export const DELETE_TEAMS = gql`
  mutation DeleteTeam($teamIds: [String]!) {
    deleteTeam(teamIds: $teamIds)
  }
`;
export const ADD_NEW_TEAM = gql`
  mutation AddNewTeam($input: AddTeamInput) {
    addNewTeam(input: $input) {
      id
      city
      name
      createdAt
    }
  }
`;

export const GET_TEAM_BY_ID = gql`
  query GetTeamById($id: String!) {
    getTeamById(id: $id) {
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
`;

export const EDIT_TEAM = gql`
  mutation EditTeam($input: EditTeamInput) {
    editTeam(input: $input) {
      id
      city
      name
      createdAt
    }
  }
`;
export const GET_TEAM_DRIVERS = gql`
  query GetTeamDrivers($input: GetAllEntitiesArguments!) {
    getTeamDrivers(input: $input) {
      data {
        id
        name
        address
        registrationPlate
        phone
        teamName
        email
        car
        deviceId
        city
        tablets
        role
        createdAt
      }
      count
    }
  }
`;

export const GET_ALL_UNTEAMED_USERS = gql`
  query GetAllUnTeamedUsers {
    getAllUnTeamedUsers {
      count
      data {
        id
        name
        address
        registrationPlate
        phone
        teamName
        email
        car
        deviceId
        city
        tablets
        role
        createdAt
      }
    }
  }
`;

export const DELETE_USERS_FROM_TEAMS = gql`
  mutation DeleteUserFromTeam($usersIds: [String]!) {
    deleteUserFromTeam(usersIds: $usersIds) {
      count
    }
  }
`;

export const GET_TEAMS_PROMOTIONS = gql`
  query GetPromotionByTeam {
    getPromotionByTeam {
      count
      data {
        id
        title
        description
        fileName
        name
      }
    }
  }
`;
