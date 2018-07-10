const Type = `
  type Order {
    cart: Cart
    products: OrderProducts
  }
  type OrderProducts {
    astrum: [AstrumProduct]
  }

  input CreateOrderInput{
    cart: CartInput
  }

  type CreateOrderPayload {
    _id: String
    result: Boolean
  }
`
export default Type
