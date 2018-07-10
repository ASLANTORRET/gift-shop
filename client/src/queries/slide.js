import { gql } from 'react-apollo'

export const SLIDES_QUERY = gql`
  query slides {
    slides {
      _id
      imageUrl
      linkUrl
      title
      caption
    }
  }
`

export const SLIDE_QUERY = gql`
  query slide ($id: String!) {
    slide(_id: $id) {
      _id
      imageUrl
      linkUrl
      title
      caption
    }
  }
`