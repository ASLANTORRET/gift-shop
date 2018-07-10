import { gql, graphql, withApollo } from 'react-apollo'

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {SEARCHTIPS_QUERY} from './../../queries/astrum'
import ToCart from './cart/link'
import _ from 'lodash'
import {connect} from 'react-redux'
import {setLanguage} from '../../actions/locale'
global.jQuery = require('jquery')
require('bootstrap')
const $ = global.jQuery

class HeaderN extends React.Component{
  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onTypeAheadClick = this.onTypeAheadClick.bind(this)
    this.onLanguageClick = this.onLanguageClick.bind(this)
    this.state = {
      options: ""
    }
  } 

  onClick(e){
    e.preventDefault()
    switch(e.currentTarget.classList[0]){      
      case 'show-content':
      $(e.currentTarget).closest('.parent-content').find('.inner-content').addClass('show')
      $(e.currentTarget).closest('.header').find('.has-mark').addClass('show-mark')
      break
      case 'search-button':
      $(e.currentTarget).closest('.parent-content').find('.inner-content').addClass('show')
      $(e.currentTarget).closest('.header').find('.has-mark').addClass('show-mark')
      break
      case 'hidden-content':
      $(e.currentTarget).closest('.inner-content').removeClass('show')
      $(e.currentTarget).closest('.header').find('.has-mark').removeClass('show-mark')
      break
      case 'toggle-submenu':
      $(e.currentTarget).closest('.menu-item-has-children').toggleClass('show-submenu')
      break
      case 'toggle-button':
      $(e.currentTarget).closest('.parent-content').find('.toggle-content').toggleClass('show')
      break
    }
  }

  onChange(e){
    let search  = e.target.value 
    search  = search.trim() 
    if(search.length > 2){
      const { language } = this.props
      console.log("header tip language: ", language)
        this.props.client.query({
            query:SEARCHTIPS_QUERY,
            variables:{ search, language }
        })
        .then((data)=>{
            if(data.data.searchTips){
                const list = data.data.searchTips.map((tip) => 
                          tip.name
                          )

                this.setState({
                    "options" : list
                })
            }            
        })
    }
    else{
      this.setState({
        "options" : ""
      }) 
    }

}
onLanguageClick(e){
  e.preventDefault()
  const language = $(e.target).text()
  this.props.setCurrentLanguage( {language} )
}
onTypeAheadClick(e){
  $("input.search-info").val($(e.target).text())
  setInterval(() => {
    $("button.search-button").click()
    },
    1000
  )
}

  render(){
    console.log("this props:", this.props)
    const {data : {astrumCategories, currentUser, loading, sitetexts}} = this.props;
    if(loading){
      return <p>loading...</p>
    }
   // const navCategories = ["Каталог", "Коллекции","VIP","Мир Empire","Бутики"]
    const groupedCategories = _.chunk(astrumCategories, 2)
    const navCategories = _.filter(sitetexts, {classname:"header"})
    const searchText = _.filter(sitetexts, {classname:"search"})
    console.log("search title: ", searchText)
    const collectionCategories = [{name:"Акбозат", image:"akbozat.jpg"},
                                  {name:"Арабеска", image:"arabeska.jpg"},
                                  {name:"Жазира", image:"zhazira.jpg"},
                                  {name:"Жеруйык", image:"zheruyik.jpg"},
                                  {name:"Казахи", image:"kazahi.jpg"},
                                  {name:"Каламкас", image:"kalamkas.jpg"},
                                  {name:"Лазурь", image:"lazur.jpg"},
                                  {name:"Лейла", image:"leyla.jpg"},
                                  {name:"Павлин", image:"pavlin.jpg"}]

    return (
      <header className="header">
          <div className="header style1">
            <div className="topbar style1">
              <div className="row">
                <div className="col-sm-12 col-md-5">                  
                  <div className="topbar-content left">
                    <p className="phones">Алматы +7 (727) 277 77 55<br/>Астана &nbsp;+7 (717) 299 91 06</p>
                  </div>   
                </div>
                <div className="col-sm-12 col-md-2">
                  <div className="topbar-content middle">
                    <div className="logo">
                      <Link to={"/"}><img src="img/imgpsh_fullsize.png" alt="Empire" /></Link>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-5">
                  <div className="topbar-content right">
                    {/* <div className="header-topbar-right">	
                      <div className="menu-item topbar-item parent-content search-form">
                        <a href="#" className="search-button show-content icon" onClick={(e)=>{$(".search-bar").toggle("fast","swing"); $(".auth-menu").hide()}}><img src="shop/img/lupa.png"/></a>
                      </div>
                      {<div className="menu-item topbar-item parent-content search-form">
                        <a href="#" className="search-button show-content icon" onClick={(e)=>{$(".auth-menu").toggle("fast","swing"); $(".search-bar").hide()}}><img src="shop/img/kluch.png"/></a>
                      </div>}
                      <div className="menu-item topbar-item minicart parent-content has-mark">
                        <ToCart/>
                      </div>                      
                    </div> */}
                    <p className="rightmenu"> ҚАЗ &nbsp;&nbsp;
                      <span className="gold">РУС</span>
                        &nbsp;&nbsp;ENG &nbsp;&nbsp;&nbsp;&nbsp;
                      <i className="flaticon-love"></i>
                      &nbsp;&nbsp; 
                      <i className="flaticon-magnifying-glass"></i>
                        &nbsp;&nbsp;<i className="flaticon-shopping-bag">
                      </i> 
                    </p>
                    {/* <ul className="topbar-menu right">
                      <li className="menu-item topbar-item top-links">
                        <a href="tel:+77272777755">+7 (727) 277 77 55</a>
                      </li>                    
                    </ul>
                    <div className="auth-menu uppercase">
                      <ul>
                        <li><Link to={"/signup"}>Создать аккаунт</Link></li>
                        <li><Link to={"/login"}>Вход в личный кабинет</Link></li>
                      </ul>
                    </div>
                    <div className="search-bar uppercase">
                      <div className="search-inner">
                        <form action="/search">
                          <input type="text" className={ searchText[0].classname + " search-info"} onChange={this.onChange} autoComplete="off" placeholder={searchText[0].title} name="search"/>
                          <button type="btn btn-submit" className={ searchText[1].classname + " search-button show-content"}>{searchText[1].title}</button>
                          {this.state.options && this.state.options.length > 0
                            && <div className="typeahead">
                                  <u>
                                    {this.state.options.map(option => 
                                      (<li onClick={this.onTypeAheadClick}>{option}</li>)
                                    )}
                                  </u>
                                </div>
                          }                          
                        </form>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div id="navbar" className="row menu-empire text-center uppercase">
                <ul>
                  <List name={navCategories[0].title} list={groupedCategories} link={'/'}/>
                  <List name={navCategories[1].title} link={'/'} list={collectionCategories} collection="true"/>
                  <List name={navCategories[2].title} link={'/vip'}/>
                  <List name={navCategories[3].title} link={'/about'}/>
                  <List name={navCategories[4].title} link={'/boutiques'}/>                                                
                </ul>
                <ul className="navbar-right list-inline">
                  <li
                      onMouseEnter={(e)=>{e.preventDefault(); $(e.currentTarget).find('.sticky-menu-layer.search').css('display', 'table');}}
                      onMouseLeave={(e)=>{e.preventDefault(); $(e.currentTarget).find('.sticky-menu-layer.search').css('display', 'none');}}
                  >
                    <div className="menu-item topbar-item parent-content search-form">
                      <a href="#" className="search-button show-content icon"><img src="shop/img/lupa.png" /></a></div>
                      <ul className="sticky-menu-layer search" style={{display: 'none'}}>
                        <div className="row-fluid">
                          <div className="col-lg-12 col-md-12">
                            <div className="search-bar-sticky uppercase">
                              <div className="search-inner">
                                <form action="/search">
                                  <input type="text" className="search-info" onChange={this.onChange} autoComplete="off" placeholder="Введите название товара..." name="search"/>
                                  <button type="btn btn-submit" className="search-button show-content">Поиск</button>
                                </form>
                                </div>
                              </div>
                          </div>
                        </div>
                      </ul>
                  </li>
                  <li
                      onMouseEnter={(e)=>{e.preventDefault(); $(e.currentTarget).closest("li").find('.sticky-menu-layer.auth').css('display', 'table');}}
                      onMouseLeave={(e)=>{e.preventDefault(); $(e.currentTarget).closest("li").find('.sticky-menu-layer.auth').css('display', 'none');}}
                  >
                    <div className="menu-item topbar-item parent-content search-form">
                      <a href="#" className="search-button show-content icon"><img src="shop/img/kluch.png" /></a>
                      </div>
                      <ul className="sticky-menu-layer auth" style={{display: 'none'}}>
                        <div className="row-fluid">
                          <div className="col-lg-12 col-md-12">
                            <div className="auth-menu-sticky uppercase">
                              <ul>
                                <li><Link to={"/signup"}>Создать аккаунт</Link></li>
                                <li><Link to={"/login"}>Вход в личный кабинет</Link></li>
                              </ul>
                            </div>
                          </div>  
                        </div>
                      </ul>
                  </li>
                  <li>
                    <div className="menu-item topbar-item minicart parent-content has-mark">
                      <ToCart/>
                    </div>
                  </li>    
                </ul>
              </div>
            </div>
          </div>
        </header>  
    )
  }
}

const DropdownMenu = (props)=>{
  
  return(
    <ul className="dropdown-menu" style={{display: 'none'}}>
      <div className="row-fluid">
        <div className="col-lg-1 dropdown-col hidden-md">
        </div>
        {          
          (props.list && props.list.length) &&
            props.list.map((list, key)=>(
              props.collection ? 
              <CollectionMenu key={key} list={list}/>
              :
              <CataloqueMenu key={key} list={list}/>
            )
          )
        }        
        <div className="col-lg-1 dropdown-col hidden-md">
        </div>
      </div>
    </ul>
    )
}

const CollectionMenu = ({key, list}) => {
  return(
    <div key={key} className="col-lg-2 col-md-3 collection">
    <Link to={`/collections?search=${list.name}`}>
      <img src={`/img/collection/${list.image}`}/>
          <div className="collection-title">
              <span>
                {list.name}
              </span>
          </div>
      </Link>
  </div>
  )
}

const CataloqueMenu = ({key, list}) => {
  return (
    <div key={key} className="col-lg-2 col-md-3 dropdown-col">
    <ul>
      <li className="heading"><Link to={`/astrum/category/${list[0].astrum_id}`}  onClick={(e)=>$(e.currentTarget).closest('.dropdown-menu').css('display', 'none')}>{list[0].category_name}</Link></li>
      {list[0].children.map((child, key)=>{
        return child.productCount > 0  
        ? <li key={key}><Link to={`/astrum/category/${child.astrum_id}`} onClick={(e)=>$(e.currentTarget).closest('.dropdown-menu').css('display', 'none')}>{child.category_name}</Link></li>
        : ""
      }
      
      )}              
    </ul>
    <ul>
      <li className="heading"><Link to={`/astrum/category/${list[1].astrum_id}`} onClick={(e)=>$(e.currentTarget).closest('.dropdown-menu').css('display', 'none')}>{list[1].category_name}</Link></li>
      {list[1].children.map((child, key)=>{
        return child.productCount > 0 
        ? <li key={key}><Link to={`/astrum/category/${child.astrum_id}`} onClick={(e)=>$(e.currentTarget).closest('.dropdown-menu').css('display', 'none')}>{child.category_name}</Link></li>
        : ""
      }
      )}              
    </ul>            
  </div>
  )
}
const List = (props)=>{
  
  return(
    <li  
      onMouseEnter={(e)=>{e.preventDefault(); 
        {props.list && 
          $(e.currentTarget).find('.dropdown-menu').css('display', 'table');}}
        }
      onMouseLeave={(e)=>{e.preventDefault(); 
        {props.list && 
          $(e.currentTarget).find('.dropdown-menu').css('display', 'none');}}
        }
        >        
      <Link to={`${props.link}`}>{props.name}</Link>
      {props.list && <DropdownMenu {...props}/>}
    </li>
  )
}
const query = gql`
query userCategoriesSiteText($language:String!, $classnames:[String]!){
  astrumCategories{
      _id
      astrum_id
      category_name(language: $language)
      children{
        _id
        astrum_id
        category_name(language: $language)
        productCount
      }
    }   
    currentUser{
      _id
      email
    }
    sitetexts(classnames:$classnames) {
      title(language:$language),
      classname
    }    
  }  
`
const withState = connect(
  (state) => {return state.locale},
  (dispatch) => ({
    setCurrentLanguage({language}){
      dispatch(setLanguage({language}))
    }
  })  
)

const withData = graphql(query, {options:({ language }) => ({ variables: { language, classnames:["header", "search"] } })})
export default withState(withApollo(withData(HeaderN)))

