import { gql } from 'react-apollo'

import { organizationProductsFragment, organizationSuggestedFragment } from '../queries/organization'

export const UPDATE_ORGANIZATION_MUTATION = gql`
  mutation updateOrganization ($input: OrganizationInput!) {
    updateOrganization(input:$input){
      _id
      managerId
      name
    }
  }
`

export const CREATE_ORGANIZATION_MUTATION = gql`
  mutation createOrganization($input : OrganizationInput!) {
    createOrganization(input: $input){
      _id
      managerId
      name
    }
  }
`

export const ADD_ORGANIZATION_OASIS_PRODUCT = gql`
  mutation addOrganizationOasisProduct($input: OrganizationOasisProductInput){
    addOrganizationOasisProduct(input:$input) {
      _id
      name
      ...OrganizationProducts
    }
  }
  ${organizationProductsFragment}
`

export const UPDATE_ORGANIZATION_OASIS_PRODUCT = gql`
  mutation updateOrganizationOasisProduct($input: OrganizationOasisProductInput){
    updateOrganizationOasisProduct(input:$input) {
      _id
      name
      ...OrganizationProducts
    }
  }
  ${organizationProductsFragment}
`

export const REMOVE_ORGANIZATION_OASIS_PRODUCT = gql`
  mutation removeOrganizationOasisProduct($input: OrganizationOasisProductInput){
    removeOrganizationOasisProduct(input:$input) {
      _id
      name
      ...OrganizationProducts
    }
  }
  ${organizationProductsFragment}
`


export const ADD_ORGANIZATION_ASTRUM_PRODUCT = gql`
mutation addOrganizationAstrumProduct($input: OrganizationAstrumProductInput){
  addOrganizationAstrumProduct(input:$input) {
    _id
    name
    ...OrganizationProducts
  }
}
${organizationProductsFragment}
`

export const UPDATE_ORGANIZATION_ASTRUM_PRODUCT = gql`
mutation updateOrganizationAstrumProduct($input: OrganizationAstrumProductInput){
  updateOrganizationAstrumProduct(input:$input) {
    _id
    name
    ...OrganizationProducts
  }
}
${organizationProductsFragment}
`

export const REMOVE_ORGANIZATION_ASTRUM_PRODUCT = gql`
mutation removeOrganizationAstrumProduct($input: OrganizationAstrumProductInput){
  removeOrganizationAstrumProduct(input:$input) {
    _id
    name
    ...OrganizationProducts
  }
}
${organizationProductsFragment}
`

export const SUGGEST_OASIS_PRODUCT = gql`
mutation suggestOasisProduct($input: OrganizationOasisProductInput){
  suggestOasisProduct(input:$input) {
    _id
    name
    ...OrganizationSuggested
  }
}
${organizationSuggestedFragment}
`

export const UNSUGGEST_OASIS_PRODUCT = gql`
mutation unsuggestOasisProduct($input: OrganizationOasisProductInput){
  unsuggestOasisProduct(input:$input) {
    _id
    name
    ...OrganizationSuggested
  }
}
${organizationSuggestedFragment}
`


export const SUGGEST_ASTRUM_PRODUCT = gql`
mutation suggestAstrumProduct($input: OrganizationAstrumProductInput){
  suggestAstrumProduct(input:$input) {
    _id
    name
    ...OrganizationSuggested
  }
}
${organizationSuggestedFragment}
`

export const UNSUGGEST_ASTRUM_PRODUCT = gql`
mutation unsuggestAstrumProduct($input: OrganizationAstrumProductInput){
  unsuggestAstrumProduct(input:$input) {
    _id
    name
    ...OrganizationSuggested
  }
}
${organizationSuggestedFragment}
`