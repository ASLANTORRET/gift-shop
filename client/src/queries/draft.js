import { gql } from 'react-apollo'

export const DRAFTS_QUERY = gql`
  query drafts{
    drafts{
      _id
      cart {
        astrum {
          astrum_id
        }
        oasis {
          oasis_id
        }
      }
      createdAt
    }
  }
`

export const DRAFT_QUERY = gql`
  query draft ($id: String!){
    draft (_id: $id){
      _id
      cart {
        astrum {
          quantity
          astrum_id
        }
        oasis {
          quantity
          oasis_id
        }
      }
      products {
        astrum {
          _id
          astrum_id
          name
          price
        }
        oasis {
          _id
          id
          name
          price
          article
        }
      }
      createdAt
    }
  }
`