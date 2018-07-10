const Type = `
  type Setting {
    _id: String
    name: String
    value: String
    cast: String
  }

  type NBRate {
    rate: Float
  }

  input SettingInput {
    _id: String
    name: String
    value: String
    cast: String
  }
`
export default Type