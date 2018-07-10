const Type = `
  type User {
    email: String
    _id: String
    jwt: String
    roles: [String]    
    organizationId: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignupInput {
    email: String!
    password: String!
    fullname: String!
    phone: String!
  }

  type UserPayload {
    result: Boolean
    user: User
  }
  input UserInput {
    _id: String
    email: String!
    password: String!
    roles: [String]
    organizationId: String
  }
`
export default Type
