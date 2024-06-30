import { gql } from 'apollo-angular';

// export const USERS = gql`
//   query Query {
//     users {
//       data {
//         id
//         name
//         email
//       }
//     }
//   }
// `;

// export const POSTS = gql`
//   query Posts($options: PageQueryOptions) {
//     posts(options: $options) {
//       data {
//         id
//         title
//       }
//       meta {
//         totalCount
//       }
//     }
//   }
// `;

// export const GetAllCounties = gql`
//   query getAllCounties {
//     getAllCounties {
//       id
//       county
//     }
//   }
// `;

export const GET_COUNTRIES = gql`
  query countries {
    countries {
      name
      code
      currency
      continent {
        name
      }
    }
  }
`;

export const COUNTRY = gql`
  query country($code: ID!) {
    country(code: $code) {
      name
      code
      currency
      phone
      awsRegion
    }
  }
`;
