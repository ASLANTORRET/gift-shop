import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from './layout'
import AstrumProduct from './catalog/astrum/product'
import AstrumCategory from './catalog/astrum/category'

import NewOrder from './order/new'
import OrderList from './order/list'  //not implemented yet
import OrderView from './order/view'  //not implemented yet
import PrintOrder from './order/print'  //not implemented yet

import DraftList from './draft/list'
import DraftView from './draft/view'

import Home from './home'
import ProfileIndex from './profile'

import Suggested from './suggested'

import Cart from './cart'
import RouterChange from './route-change'

const ShopRoutes = () => (
  <Layout>
    <RouterChange/>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/astrum/product/:astrum_id' component={AstrumProduct}/>
      <Route exact path='/astrum/category/:astrum_id' component={AstrumCategory}/>
      <Route exact path='/cart' component={Cart}/>

      <Route exact path='/order' component={NewOrder}/>
      <Route exact path='/orders' component={OrderList}/>
      <Route exact path='/order/:id' component={OrderView}/>
      <Route exact path='/order/:id/print' component={PrintOrder}/>

      <Route exact path='/profile' component={ProfileIndex}/>
      <Route exact path='/suggested' component={Suggested} />

      {/* <Route exact path='/draft' component={NewOrder}/> */}
      <Route exact path='/drafts' component={DraftList}/>
      <Route exact path='/draft/:id' component={DraftView}/>
      {/* <Route exact path='/draft/:id/print' component={PrintDraft}/> */}

    </Switch>
  </Layout>
)

export default ShopRoutes