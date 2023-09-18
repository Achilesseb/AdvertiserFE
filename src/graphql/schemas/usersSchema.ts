import { gql } from "@apollo/client";

export const GET_ALL_AVAILABLE_DRIVERS = gql`
  query GetAllAvailableUsers($input: GetAllUsersInput) {
    getAllAvailableUsers(input: $input) {
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
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers($input: GetAllUsersInput) {
    getAllUsers(input: $input) {
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

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: String) {
    getUserById(userId: $userId) {
      name
      phone
      email
      city
      address
      car
      registrationPlate
      driverId
      device {
        id
        createdAt
        system
        location
        inUse
        identifier
      }
      team {
        id
        createdAt
        name
        city
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($input: EditUserInput!) {
    editUser(input: $input) {
      name
      phone
      email
      city
      role
      address
      car
      registrationPlate
      driverId
      device {
        id
        createdAt
        system
        location
        inUse
        identifier
      }
    }
  }
`;

export const ADD_NEW_USER = gql`
  mutation AddNewUser($input: AddUserInput!) {
    addNewUser(input: $input) {
      name
      phone
      email
      city
      role
      address
      car
      registrationPlate
      driverId
      device {
        id
        createdAt
        system
        location
        inUse
        identifier
      }
    }
  }
`;
