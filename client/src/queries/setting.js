import { gql } from 'react-apollo'

export const NBRATE_QUERY = gql `
query {
  NBRate {
    rate
  }
}
`

export const SETTINGS_QUERY = gql `
query settings($names: [String]) {
  settings(names:$names) {
    name
    value
    # cast
  }
}
`

