const Type = `
  type OasisProduct {
    _id: String
    id: String
    name: String
    categories: [OasisCategory]
    price: Float
    discount_price: Float
    images: [OasisImage]
    description: String
    stock: [OasisStock]
    article: String
    brief: String
    brand: String
  }
  type OasisImage {
    big: String
    superbig: String
    thumbnail: String
  }
  type OasisStock {
    product_id: String
    warehouse_id: String
    warehouse: String
    stock: Int
    #amount: Int
    #reserve: Int
  }
`
export default Type
