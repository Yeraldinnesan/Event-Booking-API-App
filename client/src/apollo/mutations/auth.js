import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      userInput: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      _id
      email
      firstName
      lastName
    }
  }
`;
