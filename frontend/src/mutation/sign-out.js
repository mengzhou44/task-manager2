import { gql } from 'apollo-boost';

export default gql`
  mutation {
    signout {
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
