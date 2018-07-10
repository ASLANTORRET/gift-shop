import { Products } from '../product/connector'

const Resolver = {
  User: {
    // async roles(root, args, context) {
    //   return (await context.user).roles
    // },
  }
  // user(root, args, context) {
  //   /*
  //    * We access to the current user here thanks to the context. The current
  //    * user is added to the context thanks to the `meteor/apollo` package.
  //    */
  //   return context.user
  // },
}

export default Resolver