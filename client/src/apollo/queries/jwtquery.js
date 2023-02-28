import { gql } from "@apollo/client";

const GET_JWT_TOKET = gql`
  query GetJwtToken {
    jwtToken @client
  }
`;
