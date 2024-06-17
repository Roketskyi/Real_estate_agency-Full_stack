import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query {
        users {
            id
            login
            password
            email
            createdAt
        }
    }
`;

export const GET_APARTMENTS = gql`
    query GetApartments {
    apartments {
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

export const GET_APARTMENT_BY_ID = gql`
    query GetApartmentById($id: Int!) {
        apartment(id: $id) {
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