import React from 'react'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from './auth/login'
import SignupForm from './auth/signup'
import Layout from './shop/layout'
import Tab from './tab'
import ShopRoutes from './shop/routes'
//shop routes
import AstrumProduct from './shop/catalog/astrum/product'
import AstrumCategory from './shop/catalog/astrum/category'
import NewOrder from './shop/order/new'
import OrderList from './shop/order/list'  //not implemented yet
import OrderView from './shop/order/view'  //not implemented yet
import PrintOrder from './shop/order/print'  //not implemented yet
import DraftList from './shop/draft/list'
import DraftView from './shop/draft/view'
import Home from './shop/home'
import ProfileIndex from './shop/profile'
import Suggested from './shop/suggested'
import Cart from './shop/cart'
import {VIP, Boutiques, About} from './shop/pages'
import Collections from './shop/collections'
import RouterChange from './shop/route-change'
import Delivery from './delivery'
import OrderForm from './orderform'
import Recover from './recover'
import Container from './container'
import Search from './shop/catalog/astrum/search'
import {PayForm} from './pay'

const Router = ({ user }) => {
    return <BrowserRouter>
            <Layout user={user}>
                
                <Switch>
                    <Route exact path='/form' component={Tab}/>
                    <Route exact path='/delivery' 
                      render={()=><Delivery cities={[{name:"Almaty",value:"almaty"},{name:"Astana",value:"astana"}]} 
                      types={[{name:"Standart 800 KZT (2 - 3 buss. days)",value:"standart"},{name:"Express 1700 KZT (1 buss. day)",value:"express"}]}/>}/>
                    <Route exact path='/orderform' component={OrderForm}/>
                    <Route exact path='/login' render={(props)=><Container title="Авторизация"><LoginForm/></Container>}/> 
                    <Route exact path='/signup' render={(props)=><Container title="Регистрация"><SignupForm/></Container>}/> 
                    <Route exact path='/recover' render={(props)=><Container title="Восстановление пароля"><Recover/></Container>}/> 
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/astrum/product/:id' component={AstrumProduct}/>
                    <Route exact path='/astrum/category/:astrum_id' component={AstrumCategory}/>
                    <Route exact path='/cart' component={Cart}/>
                    <Route exact path='/search' component={Search}/>
                    <Route exact path='/order' component={NewOrder}/>
                    //Pages
                    <Route exact path='/collections' component={Collections}/> 
                    <Route exact path='/vip' component={VIP}/> 
                    <Route exact path='/about' component={About}/> 
                    <Route exact path='/boutiques' render={(props)=><Boutiques/>}/> 
                    //Pay
                    <Route exact path='/pay' component={PayForm}/>
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
          </BrowserRouter>
}

const withState = connect(
  (state) => ({ user: state.user })
)
export default withState(Router)
