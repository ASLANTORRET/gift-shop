import React from 'react'
import Astrum from '../../cart/_astrum'
import {ASTRUM_PRODUCTS_WITH_COUNT_QUERY, SEARCHTIPS_QUERY} from '../../../../queries/astrum'
import {graphql, withApollo} from 'react-apollo'
import {history} from 'react-router-dom'
import {connect} from 'react-redux'
import Pagination, {getOffset, getPage, getPagination} from '../../pagination'
import Product from '../astrum/_product'
import $ from 'jquery'
import {sticky_menu} from '../../home'

 class Search extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            options: []
        }
        this.onChange = this.onChange.bind(this)
        this.onTypeAheadClick = this.onTypeAheadClick.bind(this)
    }

    componentDidMount(){
        $(window).scroll(function() {
            sticky_menu();
        });
    }

    onChange(e){
        let search  = e.target.value 
        search = search.trim(" ")
        console.log("target:", search)
        if(search.length > 2){
            const { language } = this.props
            this.props.client.query({
                query:SEARCHTIPS_QUERY,
                variables:{ search, language }
            })
            .then((data)=>{
                console.log("data:", data.data.searchTips)
                if(data.data.searchTips){
                    const list = data.data.searchTips.map((tip) => {
                        return tip.name
                    });
                    console.log("list:", list)
                    this.setState({
                        "options" : list
                    })
                }            
            })
        }
    }
    
    onTypeAheadClick(e){
        this.setState({
            "options": []
        })
        $("input.search-info-main").val($(e.target).text())
        setInterval(() => {
            $("button.search-button-main").click()
          },
          1000
        )
    }

    render(){
        const {data: { loading, astrumProducts }, pagination, history, keyword} = this.props
        if (loading) {
            return <p>loading ...</p>
        }

        return (
            <section className="container">
                <h1 className="main-ttl">Поиск товаров</h1>
                <div className="row">
                    <form action="/search">
                        <div className="input-group">
                           <input name="search" className="form-control search-info-main" autoComplete="off" onChange={this.onChange} placeholder="Введите название товара..."/> 
                           <span className="input-group-btn">
                                <button type="submit" className="btn btn-submit search-button-main">Поиск</button>                        
                            </span>
                            
                            {this.state.options && this.state.options.length > 0
                            && <div className="typeahead-main">
                                  <u>
                                    {this.state.options.map(option => 
                                      (<li onClick={this.onTypeAheadClick}>{option}</li>)
                                    )}
                                  </u>
                                </div>
                          } 
                        </div>                    
                    </form>
                </div>
                <h2 className="sub-title">Результаты поиска:</h2>
                <h4>Вы искали "{keyword}"</h4>
                <Pagination pagination={pagination}/>
                <div className="prod-items section-items">
                    { astrumProducts.map(product => <Product astrumProduct={product} key={product._id} />)}
                </div>
                <Pagination pagination={pagination}/>            
            </section>    
    )
    }
 }

const ITEMS_PER_PAGE=12
const withState = connect(
    (state) => {return state.locale}
)
const withData = withState(withApollo(graphql(ASTRUM_PRODUCTS_WITH_COUNT_QUERY,{
  options({ location: { search }, language }) {
    const page = getPage(search)
    const keyword = getKeyword(search)
    const offset = getOffset(ITEMS_PER_PAGE,page)
    return { variables: { 
      search:keyword,
      language,
      offset,
      limit:ITEMS_PER_PAGE
    } }
  },
  props({ data, ownProps: { location, history } }) {
      const { pathname, search } = location
      let pagination
      const keyword = getKeyword(search)
      if (!data.loading) {
        const page = getPage(search)
        const offset = getOffset(ITEMS_PER_PAGE,page)
        pagination = getPagination({location, history}, data.productCount, ITEMS_PER_PAGE, offset)
      }
    return {data, pagination, history, keyword}
  }
}) (Search)))

export const getKeyword = (search, getVar="search") => {
    const urlSearchParams = new URLSearchParams(search)
    let keyword = ""
    if(urlSearchParams.has(getVar)){
        keyword =  urlSearchParams.get(getVar)
    }
    return keyword
}
export default withData