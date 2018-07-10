const Type = `
  type Product {
    _id: String
    astrum_id: Int
    slug: String
    name: String
    categories: [Category]
    price: Int
    images (type: String): [String]
    stock: Int
    description: String
    sku: String
  }
`
export default Type
