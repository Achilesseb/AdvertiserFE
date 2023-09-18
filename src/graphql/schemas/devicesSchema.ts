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
        driver {
          id
          name
        }
        identifier
      }
      count
    }
  }
`;

export const GET_ALL_AVAILABLE_DEVICES = gql`
  query GetAllAvailableDevices($input: GetAllDevicesInput) {
    getAllAvailableDevices(input: $input) {
      data {
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
          teamName
          email
          car
          deviceId
          city
          tablets
          role
          createdAt
        }
        identifier
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
      identifier
      driver {
        id
        name
      }
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
      identifier
      driver {
        id
        name
      }
    }
  }
`;
