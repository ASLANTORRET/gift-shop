const Type = `
  type OasisCategory {
    _id: String
    id: Int
    slug: String
    name: String
    parent: OasisCategory
    children: [OasisCategory]
    path: String
    products (offset: Int, limit: Int): [OasisProduct]
    ancestors: [OasisCategory]
    descendants: [OasisCategory]
    productCount: Int
  }
`
export default Type
