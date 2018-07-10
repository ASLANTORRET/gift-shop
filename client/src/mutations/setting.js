import { gql } from 'react-apollo'

export const SET_SETTINGS_MUTATION = gql`
mutation setSettings ($input: [SettingInput]) {
  setSettings(input:$input){
    _id
    name
    value
    #cast
  }
}
`