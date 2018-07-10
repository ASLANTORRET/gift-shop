import { gql } from 'react-apollo'

export const ASTRUM_PRODUCTS_QUERY = gql`
query astrumProducts($search: String!, $limit:Int, $offset:Int) {
  astrumProducts(search: $search, limit:$limit, offset:$offset) {
    _id
    id
    astrum_id
    code
    name(language: $language)
    price
    pictures
  }
}
`

export const ASTRUM_PRODUCTS_WITH_COUNT_QUERY = gql`
query astrumProducts($search: String!, $language:String!, $limit:Int, $offset:Int ) {
  astrumProducts(search: $search, limit:$limit, offset:$offset) {
    _id
    id
    astrum_id
    code
    name(language: $language)
    price
    pictures
  }
  productCount(search:$search, language:$language)
}
`

export const SEARCHTIPS_QUERY = gql`
  query searchTips($search: String!, $language: String!){
    searchTips(search: $search, language: $language){
      name(language: $language)
    }
  }
`
