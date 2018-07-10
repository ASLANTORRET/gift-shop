import { gql, graphql } from 'react-apollo'
import React from 'react'
// import HtmlContent from '../../html-content'
// import { Related } from './_related'
// import { wish, unwish, inWishlist } from '/imports/modules/wishlist'
import numeral from 'numeral'
import $ from 'jquery'
import '@fancyapps/fancybox'
import 'bxslider'
import Slider from '../../../slick'
import { connect } from 'react-redux'
import { addToCartAstrum } from '../../../../actions/cart'
import Accordion from '../../../accordion'
import {sticky_menu} from '../../home'

class Product extends React.Component{
  constructor(props){
    super(props)   
    this.onChange = this.onChange.bind(this) 
  }  
  onChange(e){
    return this.refs.slider.slickGoTo(e.target.value)
  }
  componentDidMount(){
    $(window).scroll(function() {
        //sticky_menu();
    });

    
    
    // const imgs = $(".slick-slide").find("img")
    // console.log("imgs: ", imgs)
    
    // const list = $(".slick-dots li")
    // console.log("list: ", list)
}
  initFancy(){
    $(document).ready(
      () => {
        $('.fancy-img').fancybox({
          padding: 0,
          helpers: {
            overlay: {
              locked: true
            },
            thumbs: {
              width: 60,
              height: 60            
            }
          }
        })  
      }  
    )
    
  }

  render(){
    const { data: { astrumProduct, loading }, addToCart} = this.props
    const SLIDER_PRODUCT_NUMBER = 4
    if (loading) {
      return <p>loading ... </p>
    }
    const settings = {
      centerMode: true,
      padding: '100px',
      rtl: false,
      //dotsClass: 'slick-list',
      slidesToShow: SLIDER_PRODUCT_NUMBER,
      init: () => {console.log("changed, after change"); this.initFancy()},
      draggable: false,
      infinite: true,
      type: 'image',
      useTransform: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: SLIDER_PRODUCT_NUMBER
          }
        },
        {
          breakpoint: 380,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ],
      nextArrow: <NextArrow/>,
      prevArrow: <PrevArrow/>
    };    
    const detailSettings = {
      rtl: false,
      //vertical: true,
      slidesToShow: 1,
      padding: '100px',
      centerMode: true,
      infinite: true,
      draggable: false,
      infinite: false,
      useTransform: true
    };    

    let slides = astrumProduct.pictures.map((file, index) => {
      return (
        <li key={index}>
            <img src={ file } alt=""/>
            <a data-fancybox-group="product" className="fancy-img" href="#detail-view-modal">
              <img width="25px" height="25px" src="../../shop/img/lupa.png" />
            </a>            
        </li>
      )
    })
    let thumbs = astrumProduct.pictures.map((file, index) => {
      return (
        <div key={index}>
            <a className="fancy-img" href="#detail-view-modal">
              <img src={ file } width="50%" height="50%"/>
            </a>            
        </div>
      )
    })
    while(slides.length < SLIDER_PRODUCT_NUMBER){
      astrumProduct.pictures.slice(0, SLIDER_PRODUCT_NUMBER - slides.length).forEach(file => 
        slides.push(
          <li key={slides.length}>
            <img src={ file } alt=""/>
            <a data-fancybox-group="product" className="fancy-img" href="#detail-view-modal">
              <img width="25px" height="25px" src="../../shop/img/lupa.png" />
            </a>            
        </li>)  
      );  
    }

return <div className="product-container">
          <Slider ref="slider" className="center slick-slide-custom" {...settings}>
            {slides} 
          </Slider>          
            <div id="detail-view-modal">
              <Slider className="center" {...detailSettings}>
                {thumbs} 
              </Slider>
            </div>                      
          <ProductBlock { ...astrumProduct } addToCart={addToCart}/>
      </div> 
}}

const ProductBlock = ({ description, name, oldPrice, price, code, material, astrum_id, addToCart }) => {
  return (
    <div className="product-block">
      <h2 className="title">{name}</h2>
      <p className="collection">Коллекция Жазира</p>
      { oldPrice
          ? <p className="price">
              <del>{ numeral(oldPrice).format('0,0') } ₸</del>
              <b className="item_current_price">{ numeral(price).format('0,0') } ₸</b>
            </p>
          : <p className="price">
              <b className="item_current_price">{ numeral(price).format('0,0') } ₸</b>
            </p>
        }

      <div className="good-code">
          <p className="uppercase">{ code }</p>
          <p>{ material }</p>
      </div>    

      <div className="form-group">
        <span className="col-md-6">
          <button className="form-control btn btn-default uppercase" onClick={(e) => {
                e.preventDefault()
                addToCart(astrum_id, 1 )
              }}>В корзину</button>  
        </span>
        <span className="col-md-6">
          <button className="form-control btn btn-default uppercase">В избранное</button>  
        </span>
      </div>  

      <div className="description">
        <h3 className="uppercase">Описание</h3>
        <p className="description-content">{description}</p>
      </div>

      <Accordion title={"ИНСТРУКЦИЯ"} content={
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred"}/>
      <Accordion title="ИНФОРМАЦИЯ" content={
        "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred"
      }/>
    </div>
  )
}

const NextArrow = (props) => {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, display: 'block', background: 'white'}}
      onClick={onClick}
    ></div>
  );
}

const PrevArrow = (props) => {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{...style, display: 'block', background: 'white'}}
      onClick={onClick}
    ></div>
  );
}


const query = gql`
  query astrumProduct ($id: Int!, $language: String!) {
    astrumProduct (id: $id) {
      _id
      id
      astrum_id
      name(language: $language)
      price
      pictures
      qty
      description(language: $language)
      code
      material(language: $language)
    }
  }
`
const withState = connect(
  (state) => {return state.locale},
  (dispatch) => ({
    addToCart(id, quantity){
      dispatch(addToCartAstrum({ id, quantity }))
    }
  })
)

const withData = graphql(query, {
  options({ match: { params: { id } }, language }) {
    return { variables: { id, language } }
  }
})

export default withState(withData(Product))
