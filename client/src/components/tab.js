import React from 'react'
import LoginForm from './auth/login'
import SignupForm from './auth/signup'
import OrderForm from './orderform'
import _ from 'lodash'

const Form = (props) =>  {
    return(        
        <TabPane blocks={
            props.blocks         
        }/>
        )
}

const TabPane = (props) => {
    const colWidth = parseInt(12 / props.blocks.length)
    return(        
        <div className="TabPane container">           
           
            {
            (props.blocks).map((blocks, key)=>
                <div className={"col-sm-" + colWidth} key={key}>
                    {blocks}
                </div>                            
            )
            }            
            
        </div>
    )
}

const Tab = () =>{
    return(
        <div className="container">
            <NavTabs labels={["Авторизация/Регистрация", "Заказ без регистрации"]}/>
            <TabContent pane1={[<LoginForm/>,<SignupForm/>]} pane2={[<OrderForm/>]}/>
        </div>
    )
}

const NavTabs = (props) => {
    return (
        <ul className="nav nav-tabs">
            {props.labels.map((label, key) => 
                <li className={key === 0 ? "active" : ""} key={key}><a data-toggle="tab" href={"#menu" + key}>{label}</a></li>
            ) }
            
        </ul>
    )
}

const TabContent = (props) => {
    const data = _.values({...props})
    return (
        <div className="tab-content">
            {                
            data.map((pane, key)=>
                <div id={"menu" + key} key={key} className={"tab-pane fade" + (key === 0 && " in active")}>
                    <Form blocks={pane}/>
                </div>    
            )}
                         
        </div>
    )
}

export default Tab