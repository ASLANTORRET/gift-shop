const Type = `
  type AstrumProduct {
    _id: String
    id:Int
    astrum_id: Int
    code: String
    name_rus: String
    price: Int
    pictures: [String]
    qty: Int
    astrum_id: Int
    category_name:String
    material(language:String!):String
    material_rus: String
    material_eng: String
    material_kaz: String
    name(language:String!):String
    name_rus: String
    name_eng:String
    name_kaz:String
    size_rus: String
    size_eng:String
    size_kaz:String
    description(language:String!):String
    description_rus: String
    description_kaz: String
    description_eng: String    
    collection_id: Int
    collection_name:String
  }
`
export default Type
