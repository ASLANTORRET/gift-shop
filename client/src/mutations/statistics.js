import { gql } from 'react-apollo'

export const CREATE_STATISTICS_MUTATION = gql`
  mutation createStatistics($input: StatisticsInput!) {
    createStatistics(input: $input){
      result
    }
  }
`