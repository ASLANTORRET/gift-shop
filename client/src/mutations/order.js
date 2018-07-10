import { gql } from 'react-apollo'

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder ($input: CreateOrderInput!) {
    createOrder(input: $input){
      _id
      result
    }
  }
`