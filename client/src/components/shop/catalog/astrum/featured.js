import React from 'react'
import Product from './_product'
// import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'

import 'flexslider'
import 'flexslider/flexslider.css'

const $ = require('jquery')
const getGridSize_pop = () => {
  return (window.innerWidth < 480) ? 1 :
    (window.innerWidth < 650) ? 2 :
    (window.innerWidth < 992) ? 3 :
    (window.innerWidth < 1200) ? 3 : 4;
}
class Featured extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      activeTab: 0
    }
  }
  initSlider() {
    if (this.slider) {
      $(this.slider).flexslider({
        animation: "slide",
        selector: ".slides > div",
        controlNav: true,
        slideshow: false,
        itemWidth: 270,
        itemMargin: 12,
        minItems: getGridSize_pop(),
        maxItems: getGridSize_pop(),
      })
    }
  }
  componentDidMount() {
    this.initSlider()
  }
  componentDidUpdate(){
    this.initSlider()
  }
  render() {
    const { addToCart, data: { loading, category } } = this.props
    if (loading) {
      return <p>loading ...</p>
    }
    const categories = category ? category.children : []
    return (
      <div className="fr-pop-wrap">

        <h3 className="component-ttl">
          <span>Популярные товары</span>
        </h3>

        <ul className="fr-pop-tabs sections-show">
          {categories.map((category, index) => (
            <li key={category._id}>
              <button className={index === this.state.activeTab
                  ? "active"
                  : ""
                }
                onClick={() => {
                  this.setState({activeTab: index})
                }}
              >{category.name}</button>
            </li>
          ))}
        </ul>

        <div className="fr-pop-tab-cont">
          <div className="flexslider prod-items fr-pop-tab" ref={(node => {this.slider = node})}>
            <div className="slides">
              {categories[this.state.activeTab].products.map((product) => (<Product key={product._id} product={product} addToCart={addToCart}/>))}
            </div>
          </div>
          {/* {categories.map((category, index) => (
            <div className="flexslider prod-items fr-pop-tab" id={`frpoptab-tab-${index}`} key={category._id}>

              <div className="slides">
                {category.products.map((product) => (<Product key={product._id} product={product} addToCart={addToCart}/>))}
              </div>

            </div>
          ))} */}
        </div>

      </div>
    )
  }
}

const query = gql`
  query {
    category (slug: "featured") {
      children {
        _id
        name
        products {
          _id
          astrum_id
          name
          slug
          price
          images (type: "thumbnail")
        }
      }
    }
  }
`

const withData = graphql(query)(Featured)
export default withData