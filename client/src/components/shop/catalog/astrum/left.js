import { gql, graphql } from 'react-apollo'

import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import {connect} from 'react-redux'
import _ from 'lodash'

class CategoriesLeft extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rangeValue: 0
    }
  }
  isCategory (_category) {
    const { astrumCategory } = this.props
    return ( astrumCategory && _category
      && ( astrumCategory._id === _category._id
        || (astrumCategory.parent && astrumCategory.parent._id === _category._id)
      )
    )
  }
  componentDidMount() {
    $('.categories-left #section-sb-toggle').on('click', function () {
        $('#section-sb-list').slideToggle()
        if ($(this).hasClass('opened'))
            $(this).removeClass("opened")
        else
            $(this).addClass('opened')
        return false
    })
    $('.categories-left #section-sb-list li.has_child')
      .on('click', '.section-sb-toggle', function () {
        $(this).parent().next('ul').slideToggle()
        if ($(this).hasClass('opened'))
            $(this).removeClass('opened')
        else
            $(this).addClass('opened')
        return false
      })
  }
  componentWillUnmount() {
    $('.categories-left #section-sb-toggle').off('click')
    $('.categories-left #section-sb-list li.has_child').off('click')
  }
  render () {
    const { astrumCategory, data: { loading, astrumCategories, sitetexts } } = this.props
    if (loading) {
      return <p>loading ...</p>
    }
    const _category = astrumCategory
    const siteTexts = _.filter(sitetexts, {classname:"categories-left"})
    
    // const language = TAPi18n.getLanguage()
    if (astrumCategories.length) {

      return (
        <div className="section-sb-current categories-left">
          <h3>
            <a>
              <img src="/shop/img/menu-button.png"/>{siteTexts[0].title}
              <span id="section-sb-toggle" className="section-sb-toggle">
                <span className="section-sb-ico"></span>
              </span>
            </a>
          </h3>

          <ul className="section-sb-list" id="section-sb-list">            
            { astrumCategories.map(category => (
              <li key={ category._id } 
                className={
                  `categ-1 
                  ${
                    category.children && category.children.length 
                    ? 'has_child' 
                    : '' 
                    }`
                }
              >
                <Link to={`/astrum/category/${category.astrum_id}`}>
                  <span className="categ-1-label">{category.category_name}</span>
                  { category.children && category.children.length
                    ? <span className={`section-sb-toggle
                      ${ this.isCategory(category) ? 'opened' : ''}`}>
                        <i className="flaticon-right-arrow" aria-hidden="true"></i>
                      </span>
                    : null
                  }
                </Link>
                { category.children && category.children.length
                  ? <ul style={ this.isCategory(category) ? { display: 'block'} : {}}>
                      { category.children.map(child => (
                        <li className="categ-2" key={ child._id }>
                          <Link to={`/astrum/category/${child.astrum_id}`}>
                            <span className="categ-2-label">{ child.category_name }</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  : null
                }
              </li>
            )) }
          </ul>
        </div>
      )
    } else {
      return null
    }
  }
}

const query = gql`
  query($language:String!, $classnames:[String]!) {
    astrumCategories {
      _id
      astrum_id
      category_name(language:$language)
      children {
        _id
        astrum_id
        category_name(language:$language)
      }      
    }
    sitetexts(classnames:$classnames) {
      title(language:$language),
      classname
    }
  }
`
const withState = connect(
  (state) => {return state.locale},
  null
)
const withData = graphql(query, {options:({ language }) => ({ variables: { language, classnames:["categories-left"] } })})

export default withState(withData(CategoriesLeft))