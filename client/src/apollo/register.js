import { gql } from "@apollo/client";

export const REGISTER_USER_MUTATION = gql`
  mutation createUser($loginInput: CreateUserInput!) {
    createUser(createUserInput: $loginInput) {
      login
      email
    }
  }
`;
