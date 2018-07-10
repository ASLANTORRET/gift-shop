import { gql } from 'react-apollo'

export const CART_QUERY = gql`
  query cart ($astrum: [Int]) {
    cart{
      astrum(ids: $astrum) {
        name_rus
        name_eng
        name_kaz
        id
        astrum_id
        code
        price
        pictures
      }
    }
  }
`