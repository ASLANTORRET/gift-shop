import { gql, graphql } from 'react-apollo'
import React from 'react'
// import { Link } from 'react-router'

// import { Category } from './category'
import AstrumLeft from './left'
import { Filter } from './_filter'
import { Sort } from './_sort'
import Product from './_product'
import Pagination, { getPagination, getOffset, getPage } from '../../pagination'
import { connect } from 'react-redux';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getKeyword } from './search'
import { withRouter } from 'react-router'

// import _ from 'lodash'
// export const AstrumCategory = ({data: { loading, category }, pagination}) => {
  

export const AstrumCategory = (...args) => {
  const {data: { loading, astrumCategory }, pagination, history, match: { params: { astrum_id }}} = args[0]
  if (loading) {
    return <p>loading ...</p>
  }
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  return <section className="container">  
    <h1 className="main-ttl uppercase">{ astrumCategory.category_name }</h1>
    <div className="section-sb">
    <div className="product-range">
      <p>Фильтр по цене: </p>
      <Range 
        min={100} 
        max={580000} 
        defaultValue={[11000, 16000]} 
        tipFormatter={value => `${value.toLocaleString()} тнг.`} 
        step={100}
        marks={{150:'150 тнг.', 580000:'580 000 тнг.'}}
        handleStyle={[{borderColor:"#a8894b"}]}
        trackStyle={[{borderColor:"#a8894b"}]}
        onChange={(data) => {
          console.log("range", data)  
          return history.push(`/astrum/category/${astrum_id}?range=${data}`)   
        }}
        />
    </div>

      <AstrumLeft astrumCategory={ astrumCategory } />

      <Filter />

    </div>

    <div className="section-cont">

      <Sort />
      <Pagination pagination={pagination}/>

      <div className="prod-items section-items">
        { astrumCategory.products && astrumCategory.products.map(product => <Product astrumProduct={product} key={product._id} />)}
      </div>

      <Pagination pagination={pagination}/>

    </div>
  </section>
}


const query = gql`
  query astrumCategory($astrum_id: Int!, $offset: Int, $limit: Int, $language: String!, $priceRange: [Int]) {
    astrumCategory(astrum_id: $astrum_id) {
      _id
      astrum_id
      category_name(language:$language)
      productCount
      parent {
        _id
        name
      }
      products (offset: $offset, limit: $limit, priceRange: $priceRange)  {
        _id
        id
        astrum_id
        name(language:$language)
        price
        code
        pictures
      }
      children {
        _id
        astrum_id
        name
      }
    }
  }
`

const ITEMS_PER_PAGE=12

const withState = connect(
  (state) => {return state.locale}
)
const withData = graphql(query,{
  options({ match: { params: { astrum_id } }, location: { search }, language}) {
    const page = getPage(search)
    const keyword = getKeyword(search, "range")
    const offset = getOffset(ITEMS_PER_PAGE,page)
    console.log("search2: ", keyword)
    
    if(keyword){
      console.log("result: ", keyword)
      return { variables: { 
        astrum_id,
        limit: ITEMS_PER_PAGE,
        priceRange: keyword.split(","),
        offset,
        language
      } }
    }
    return { variables: { 
      astrum_id,
      limit: ITEMS_PER_PAGE,
      offset,
      language
    } }
  },
  props({ data, ownProps: { location, history } }) {
    const { pathname, search } = location
    let pagination
    if (!data.loading) {
      const page = getPage(search)
      const offset = getOffset(ITEMS_PER_PAGE,page)
      pagination = getPagination({location, history}, data.astrumCategory.productCount, ITEMS_PER_PAGE, offset)
    }
    return {data, pagination}
  }
}) 

export default withRouter(withState(withData(AstrumCategory)))
