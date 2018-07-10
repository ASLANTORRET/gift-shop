import { gql } from 'react-apollo'

export const CREATE_DRAFT_MUTATION = gql`
  mutation createDraft ($input: CreateDraftInput!) {
    createDraft(input: $input){
      _id
      result
    }
  }
`