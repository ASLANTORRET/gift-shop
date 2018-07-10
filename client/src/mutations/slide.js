import { gql } from 'react-apollo'

export const CREATE_SLIDE_MUTATION = gql`
  mutation createSlide($input: SlideInput!) {
    createSlide(input: $input){
      result
    }
  }
`

export const UPDATE_SLIDE_MUTATION = gql`
  mutation updateSlide($input: SlideInput!) {
    updateSlide(input: $input){
      result
    }
  }
`