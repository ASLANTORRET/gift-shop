import React from 'react'

import { graphql } from 'react-apollo'

import { connect } from 'react-redux'

import { CURRENT_USER_QUERY } from '../queries/user'
import { setUser }  from '../actions/user'

import Router from './router'

class Auth extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { data, user, setCurrentUser } = nextProps
    if (data.currentUser && !data.loading && !user) {
      setCurrentUser(data.currentUser)
    }
  }
  render() {
    const { data: { loading } } = this.props
    if (loading) {
      return <p>loading ...</p>
    }
    return <Router/>
  }
}

const withState = connect(
  (state) => ({ user: state.user }),
  (dispatch) => ({
    setCurrentUser({_id, roles}) {
      dispatch(setUser({_id, roles}))
    }
  })
)
const withData = graphql(CURRENT_USER_QUERY)

export default withData(withState(Auth))
