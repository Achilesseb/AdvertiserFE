import { gql } from "@apollo/client";

export const GET_ALL_CLIENTS = gql`
  query GetAllClients($input: GetAllClientsInput) {
    getAllClients(input: $input) {
      count
      data {
        id
        name
        contactEmail
        phone
        address
        cui
        city
        createdAt
        totalPromotions
        promotions
        totalDuration
      }
    }
  }
`;

export const GET_CLIENT_BY_ID = gql`
  query GetClientById($id: String!) {
    getClientById(id: $id) {
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
`;

export const EDIT_CLIENT = gql`
  mutation EditClient($input: EditClientInput) {
    editClient(input: $input) {
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
`;

export const ADD_NEW_CLIENT = gql`
  mutation AddNewClient($input: AddClientInput) {
    addNewClient(input: $input) {
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
`;

export const DELETE_CLIENT = gql`
  mutation DeleteClient($clientIds: [String]!) {
    deleteClient(clientIds: $clientIds)
  }
`;
