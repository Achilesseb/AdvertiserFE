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
        identificator
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
