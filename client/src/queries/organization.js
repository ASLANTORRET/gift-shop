import { gql } from 'react-apollo'

export const ORGANIZATIONS_QUERY = gql `
  query {
    organizations {
      _id
      name
    }
  }
`

export const ORGANIZATION_QUERY = gql`
  query organization ($id: String!) {
    organization(_id: $id) {
      _id
      name
      managerId
    }
  }
`

export const organizationProductsFragment = gql`
fragment OrganizationProducts on Organization {
  products{
    astrum {
      _id
      astrum_id
      name
      description
      price
      product {
        name
        price
        pictures
      }
    }
    oasis {
      _id
      oasis_id
      name
      description
      price
      product {
        name
        price
        images{
          thumbnail
        }
      }
    }
  }
}
`

export const organizationSuggestedFragment = gql`
fragment OrganizationSuggested on Organization {
  suggested{
    astrum {
      _id
      astrum_id
      product {
        name
        price
      }
    }
    oasis {
      _id
      oasis_id
      product {
        name
        price
      }
    }
  }
}
`

export const ORGANIZATION_WITH_PRODUCTS_QUERY = gql`
  query organization ($id: String!) {
    organization(_id: $id) {
      _id
      name
      managerId
      ...OrganizationProducts
    }
  }
  ${organizationProductsFragment}
`

export const ORGANIZATION_WITH_SUGGESTED_QUERY = gql`
query organization ($id: String!) {
  organization(_id: $id) {
    _id
    name
    managerId
    ...OrganizationSuggested
  }
}
${organizationSuggestedFragment}
`