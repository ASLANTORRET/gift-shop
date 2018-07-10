const Type = `
  type Statistics {
    _id: String
    clientId: String
    referrer: String
    pathname: String
    createdAt: Date
  }

  input StatisticsInput {
    referrer: String
    pathname: String
    type: String
    objectId: String
  }

  type StatisticsPayload {
    _id: String
    result: Boolean
  }
`
export default Type
