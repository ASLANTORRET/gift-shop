const Type = `
  type Slide {
    _id: String
    caption: String
    imageUrl: String
    linkUrl: String
    title: String
    categoryId: Int
  }

  input SlideInput{
    caption: String!
    imageUrl: String!
    linkUrl: String!
    title: String!
    categoryId: Int!
  }

  type SlidePayload {
    _id: String
    result: Boolean
  }
`
export default Type
