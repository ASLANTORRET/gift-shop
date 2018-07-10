export const setUser = ({ _id, roles }) => {
  return {
    type: "SET_USER",
    _id,
    roles,
  }
}