import { gql } from 'react-apollo'

export const OASIS_PRODUCT_QUERY = gql`
query oasisProduct($oasis_id: String!) {
  oasisProduct(oasis_id: $oasis_id) {
    id
    _id
    name
    article
    price
    description
    brief
    images{
      big
      superbig
    }
    stock{
      stock
      warehouse
    }
  }
}
`

export const OASIS_PRODUCTS_QUERY = gql`
query oasisProducts($search: String!) {
  oasisProducts(search: $search) {
    id
    _id
    name
    article
    price
    description
    brief
    images{
      big
      superbig
      thumbnail
    }
    stock{
      stock
      warehouse
    }
  }
}
`