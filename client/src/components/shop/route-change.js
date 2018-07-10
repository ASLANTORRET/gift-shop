import React from 'react'
import { withRouter } from 'react-router-dom'

import { CREATE_STATISTICS_MUTATION } from '../../mutations/statistics'
import { graphql } from 'react-apollo'


class RouteChange extends React.Component {
  componentDidMount () {
    const referrer = document.referrer
    this.routeChanged(referrer)
  }

  componentDidUpdate (prevProps) {
    const { location: { pathname } } = this.props
    const prevPathname = prevProps.location.pathname
    if (prevPathname === pathname) return
    this.routeChanged(prevPathname)
  }

  routeChanged (referrer) {
    const { location: { pathname, state } } = this.props
    const { type, objectId } = state || {}
    this.props.createStatistics({ referrer, pathname, type, objectId })
  }

  render () {
    return null
  }
}

const withMutation = graphql(CREATE_STATISTICS_MUTATION, {
  props: ({ mutate }) => ({
    createStatistics({ referrer, pathname, type, objectId }) {
      const input = { referrer, pathname, type, objectId }
      console.log(input)
      mutate({ variables: { input } })
    }
  })
})

export default withMutation(withRouter(RouteChange))