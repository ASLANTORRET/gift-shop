export const addToCartAstrum = ({ id, quantity }) => {
  return ({
    type: "ADD_TO_CART",
    id,
    quantity,
  })
}
export const removeFromCartAstrum = ({ id }) => ({
  type: "REMOVE_FROM_CART",
  id,
})

export const emptyCart = () => ({
  type: "EMPTY_CART"
})

// export const addToCartOasis = ({ oasis_id, quantity }) => {
//   return ({
//     type: "ADD_TO_CART",
//     oasis_id,
//     quantity,
//   })
// }
// export const removeFromCartOasis = ({ oasis_id }) => ({
//   type: "REMOVE_FROM_CART",
//   oasis_id,
// })