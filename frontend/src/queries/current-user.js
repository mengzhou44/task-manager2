import { gql } from 'apollo-boost';

export default gql`
  query  {
     user  {
      id
      firstName
      lastName
      locale
      email
      phone
      tasks {
        id
        description
        completed
      }
    }
  }
`;
