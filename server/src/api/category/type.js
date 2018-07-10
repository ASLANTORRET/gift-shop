const Type = `
  type Category {
    _id: String
    slug: String
    name: String
    parent: Category
    children: [Category]
    products (offset: Int, limit: Int): [Product]
    productCount: Int
  }
`
export default Type
