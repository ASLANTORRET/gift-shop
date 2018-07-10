import React from 'react'
import Router from './components/router'
import Auth from './components/auth'
import { ApolloProvider } from 'react-apollo'

// import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';



import client from './client'

import store from './store'

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client} store={store} >
        {/* <Router /> */}
        <Auth />
      </ApolloProvider>
    )
  }
}

export default App
