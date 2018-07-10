import { gql } from 'react-apollo'

export const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input){
      _id
      jwt
      roles
    }
  }
`
export const SIGNUP_MUTATION = gql`
  mutation signup($input: SignupInput!){
    signup(input: $input){
      _id
      jwt
      roles
    }
  }
`
export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input){
      result
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($input: UserInput!) {
    updateUser(input: $input){
      result
    }
  }
`