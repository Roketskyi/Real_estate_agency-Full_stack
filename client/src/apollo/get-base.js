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
    query {
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
        }
    }
`;