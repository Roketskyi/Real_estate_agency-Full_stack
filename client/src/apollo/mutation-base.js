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

export const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($id: Int!, $avatar: String!) {
    updateUser(updateUserInput: { id: $id, avatar: $avatar }) {
      avatar
    }
  }
`;
