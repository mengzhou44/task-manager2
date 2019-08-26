import gql from 'graphql-tag';

export default gql`
  query FetchUser($id: Int!) {
    user(id: $id) {
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
