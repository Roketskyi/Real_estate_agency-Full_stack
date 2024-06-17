import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($loginOrEmail: String!, $password: String!) {
    login(loginOrEmail: $loginOrEmail, password: $password) {
      accessToken
      id
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query {
    isLoggedIn
  }
`;