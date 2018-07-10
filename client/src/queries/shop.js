import { gql } from 'react-apollo'

export const CURRENT_ORGANIZATION_QUERY = gql`
query {
  currentOrganization {
    suggested {
      oasis {
        product {
          _id
          id
          name
          price
          images {
            big
          }
        }
      }
    }
  }
}
`