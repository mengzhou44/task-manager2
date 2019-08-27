import { gql } from 'apollo-boost';
export default gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
