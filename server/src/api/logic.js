export const getAuthenticatedUser = (context, role) => {
  return context.user.then(user => {
    if (!user) {
      return Promise.reject('unauthorized')
    }
    if (role) {
      if (user.roles && user.roles.indexOf(role) !== -1) {
        return user
      } else {
        return Promise.reject('unauthorized')
      }
    } else {
      return user
    }
  })
}
