import gql from 'graphql-tag';

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
