const Type = `
  type Cart {
    astrum(ids: [Int]): [AstrumProduct]
    length: Int
  }
  
  input CartInput {
    astrum: [AstrumCartInput]
  }
  input AstrumCartInput {
    astrum_id: Int
    quantity: Int
  }
`
export default Type
