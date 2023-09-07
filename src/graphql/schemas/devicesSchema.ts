import { gql } from "@apollo/client";

export const GET_ALL_DEVICES = gql`
  query GetAllDevices($input: GetAllDevicesInput) {
    getAllDevices(input: $input) {
      data {
        id
        createdAt
        system
        location
        inUse
        identifier
        driver {
          id
          name
          address
          registrationPlate
          phone
          team
          email
          carDetails
          tabletId
          city
          tablets
          role
        }
      }
      count
    }
  }
`;

export const GET_DEVICE_BY_ID = gql`
  query GetDeviceById($deviceId: String!) {
    getDeviceById(deviceId: $deviceId) {
      id
      createdAt
      system
      location
      inUse
      identifier
      driver {
        id
        name
        address
        registrationPlate
        phone
        team
        email
        carDetails
        tabletId
        city
        tablets
        role
      }
    }
  }
`;

export const ADD_NEW_DEVICE = gql`
  mutation ADD_NEW_DEVICE($input: AddDeviceInput!) {
    addNewDevice(input: $input) {
      id
      createdAt
      system
      location
      inUse
      driver {
        id
        name
        address
        registrationPlate
        phone
        team
        email
        carDetails
        tabletId
        city
        tablets
        role
      }
      identifier
    }
  }
`;

export const EDIT_DEVICE = gql`
  mutation EDIT_DEVICE($input: EditDeviceInput!) {
    editDevice(input: $input) {
      id
      createdAt
      system
      location
      inUse
      driver {
        id
        name
        address
        registrationPlate
        phone
        team
        email
        carDetails
        tabletId
        city
        tablets
        role
      }
      identifier
    }
  }
`;
