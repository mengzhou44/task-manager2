import { gql } from 'apollo-boost';

export default gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phone: String!
    $locale: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phone: $phone
      locale: $locale
    ) {
      token
    }
  }
`;
