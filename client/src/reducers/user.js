const user = (state = null, { type, _id, roles }) => {
  switch (type) {
    case 'SET_USER':
      return { _id, roles }
    default:
      return state
  }
}

export default user