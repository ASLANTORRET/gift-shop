const Type = `
  type AstrumCategory {
    _id: String
    astrum_id: Int
    name: String
    category_name(language: String!): String
    parent: AstrumCategory
    children: [AstrumCategory]
    products (offset: Int, limit: Int, priceRange: [Int]): [AstrumProduct]
    productCount: Int
  }
`
export default Type
