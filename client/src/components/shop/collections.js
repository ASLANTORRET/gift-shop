import Product from '../shop/catalog/astrum/_product'
import { gql, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import React from 'react'
import {getKeyword} from '../shop/catalog/astrum/search'

class Collections extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        console.log("props: ", this.props)
        const { data: { collectionProducts, loading } } = this.props
        if (loading) {
            return <p>loading ...</p>
        }
        const topCollectionProducts = collectionProducts.slice(0, 4)
        return(
        <div className="container">
            <div className="row-fluid">
                <div className="col-lg-6 col-md-3">
                    <img src="/img/collection/arabeska.jpg" alt="collection banner"/>
                </div>
                <div className="prod-items section-items">
                { topCollectionProducts.map(product => <Product astrumProduct={product} key={product._id} collection="true"/>)} 
                </div>
                <div className="col-lg-6 col-md-3 pull-right">
                    <img src="/img/collection/arabeska.jpg" alt="collection banner"/>
                </div>
                <div className="prod-items section-items">
                { collectionProducts.map(product => <Product astrumProduct={product} key={product._id} collection="true"/>)} 
                </div>
            </div>
        </div>
        )
    }   
}

const query = gql` 
    query collectionProducts($language:String!, $collection:String!){
        collectionProducts(collection:$collection) {
            name(language:$language),
            pictures,
            price,
            id
        }
}
`
const withState = connect(
    (state) => {return state.locale}
)
const withData = graphql(query, {options:( {language, location:{search}} ) => ({variables: { language: language, collection: getKeyword(search) } })})

export default withState(withData(Collections))