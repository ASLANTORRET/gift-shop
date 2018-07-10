import UserLogic from './logic'

const Mutation = {
  login(root, { input }, context) {
    const { email, password } = input
    return UserLogic.login(root, input, context)
  },
  signup(root, { input }, context) {
    return UserLogic.signup(root, input, context)
  },
  createUser(root, { input }, context) {
    const { email, password, organizationId } = input
    return UserLogic.createUser(root, input, context)
  },
  updateUser(root, { input }, context) {
    const { _id, email, password, organizationId, roles } = input
    return UserLogic.updateUser(root, input, context)
  },

}

export default Mutation