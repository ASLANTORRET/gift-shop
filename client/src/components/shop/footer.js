import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {gql, graphql} from 'react-apollo'

const Footer = ({ data:{ sitetexts, loading } }) => {
  if(loading){
    return <p>loading...</p>
  }
  return (
    <footer>
        <div className="footer layout1">
          <div className="col-xs-12 col-md-12 col-lg-3 left-content">
            <div className="coppy-right">
              <h3 className="content"><span className="site-name">© Empire Group</span> Copyright 2017</h3>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 middle-content">
            <ul className="other-links">
              <li><a href="#" data-text="Contact">{sitetexts[0].title}</a></li>
              <li><a href="#" data-text="Policies">{sitetexts[1].title}</a></li>
              <li><a href="#" data-text="Terms & Privacy">{sitetexts[2].title}</a></li>
              <li><Link to={'about'} data-text="About">{sitetexts[3].title}</Link></li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-3 right-content">
            <ul className="riverside-social">
              <li><a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a></li>
              <li><a href="#"><i className="fa fa-pinterest" aria-hidden="true" /></a></li>
            </ul>
          </div>
        </div>      
                
            
      </footer>
  )
}
const query = gql`
  query siteTextsFooter($language: String!,$classnames: [String]!){
    sitetexts(classnames:$classnames) {
      title(language:$language),
      classname
    }
  }
`
const withState = connect(
  (state) => {return state.locale}
)
const withData = graphql(query, {options:({ language }) => ({ variables: { language, classnames:["footer"] } })})

export default withState(withData(Footer))