import { gql } from "@apollo/client";

export const ADD_NEW_APARTMENT = gql`
  mutation CreateApartment($input: CreateApartmentInput!) {
    createApartment(createApartmentInput: $input) {
      id
      title
      description
      price
      imageUrl
      seller {
        id
        login
        email
      }
      locality
      floorInApartment
      numberOfRooms
      square
      wallMaterial
      heating
    }
  }
`;