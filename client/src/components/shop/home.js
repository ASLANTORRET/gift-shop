import React from 'react'
import Featured from './catalog/astrum/featured'
import Slides from './slides'
import owlCarousel from 'owl.carousel/dist/owl.carousel.min'
import 'owl.carousel2.thumbs/dist/owl.carousel2.thumbs.min'
//import WOW from 'wowjs/dist/wow'
import {graphql, gql} from 'react-apollo'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { addToCartAstrum } from '../../actions/cart'
import {Link} from 'react-router-dom'
import { loadavg } from 'os';

const $ = global.jQuery

class ShopHome extends React.Component {
  
  componentDidMount() {
    
    document.title='Empire'
    
    $(window).ready(function() {
      // kt_innit_carousel(); 
      kt_tab_fadeeffect();
      kt_countdown();
      // kt_resizeMegamenu();
      // kt_verticalMegamenu();
      // newletter_popup();
      //better_equal_elems();       
      //new WOW.WOW().init();      
    });
      
    $(window).scroll(function() {
        //sticky_menu();
    });
    // $(window).resize(function(){
    //     kt_resizeMegamenu();
    //     kt_verticalMegamenu();
    //     better_equal_elems();
    // });

  }
  render() {
    const{data:{featuredCategories, loading}, addToCart, language} = this.props
    if(loading){
      return <p>loading...</p>
    } 
    return (
      <section className="">
        {/* <Slides /> */}
        {/* <Featured/> */}
        {featuredCategories && featuredCategories.map((category, key)=>(
          <div className="main-content-home1" key={key}>
            <Slides slides={category.slides}/>
            <div className={"riverside-products layout" + (key % 2 == 0 ? "1":"2")}>
              <div className={"controls " + (key % 2 == 0 ? "left" : "right")}>
                <h4 className="title uppercase ww" dangerouslySetInnerHTML={{__html: category.name}}>                  
                </h4>
              </div>
              <div className="riverside-products-content">
                <div className="kt-owl-carousel products-list owl-carousel owl-theme owl-loaded" data-autoplay="true" data-nav="true" data-dots="true" data-loop="true" data-slidespeed={200} data-margin={0} data-responsive="{&quot;0&quot;:{&quot;items&quot;:1}, &quot;640&quot;:{&quot;items&quot;:2}, &quot;768&quot;:{&quot;items&quot;:2}, &quot;1024&quot;:{&quot;items&quot;:3}, &quot;1200&quot;:{&quot;items&quot;:4}}">
                  {category.products && category.products.map((product, key)=>(
                    <div className="product-item" key={key}>
                    <div className="product-inner">
                      <div className="product-thumb">
                        <Link className="thumb-link" to={`/astrum/product/${product.id}`}>
                          <img src={product.pictures[0]} alt={product.name} />
                        </Link>
                        
                        <div className="group-flash">
                        <span className="flash sale">
                          <i className="fa fa-heart-o" aria-hidden="true"></i>
                        </span>
                        <span className="flash sale" onClick={(e) => {
                            e.preventDefault()
                            addToCart(product.id)
                          }}>КУПИТЬ</span>                          
                       {/*  <a className="add-to-wishlist" href="#" />
                          <a className="compare" href="#" /> */}
                        </div>
                        {/* <div className="group-flash">
                          <span className="flash new">NEW</span>
                        </div> */}
                      </div>
                      <div className="product-info">
                        <Link className="product-name" to={`/astrum/product/${product.id}`}>
                          { product.name ? `${product.name}` : null }
                        </Link>
                        {product.oldPrice
                          ? <div className="price">
                              <del>{ numeral(product.oldPrice).format('0,0') } ₸</del>
                              &nbsp
                              <ins>{ numeral(product.price).format('0,0') } ₸</ins>
                            </div>
                          : <div className="price">
                              <ins>{ numeral(product.price).format('0,0') } ₸</ins>
                            </div>
                        }
                      </div>
                    </div>
                  </div>
                  ))}                 
                  
                </div>
              </div>
            </div>
  
          </div>    
        
        ))}
        </section>)
  }
}

const skillBar = ()=>{
     // Skill bar
     $('.skillbar').each(function(){
      var percent = 0;
      percent = parseFloat($(this).attr('data-percent'));
      $(this).find('.skillbar-bar').animate({
          width:0});
      $(this).find('.skillbar-bar').animate({
         width:percent + '%'
      },6000);
  });
   $('.skillbar-vertival').each(function(){
      var percent = 0;
      percent = parseFloat($(this).attr('data-percent'));
      $(this).find('.skillbar-bar-vertival').animate({
          height: percent + '%'
      },6000);
  });
  $('.skillbar-icon').each(function(){
      var numberIcon = parseFloat($(this).find('.skill-bar-iconbg > .bar').size());
      var widthIcon = parseFloat($(this).find('.skill-bar-iconbg > .bar:eq(0)').width());
      var widthSkill = 0;
      var percent = 0;
      percent = parseInt($(this).attr('data-percent'));
      widthSkill = numberIcon * widthIcon;
      $(this).find('.icon-skillbar').css("width",widthSkill + 'px')
      $(this).find('.skillbar-bar-icon').animate({
          width: percent + '%'
      },6000);
  });
}

const better_equal_elems = ()=> {
    if($(window).width() + kt_get_scrollbar_width() > 1024){
        $('.equal-container').each(function () {
            var $this = $(this);
            if ($this.find('.equal-elem').length) {
                $this.find('.equal-elem').css({
                    'height': 'auto'
                });
                var elem_height = 0;
                $this.find('.equal-elem').each(function () {
                    var this_elem_h = 0;
                    this_elem_h = parseFloat($(this).height());
                    if (elem_height < this_elem_h) {
                        elem_height = this_elem_h;
                    }
                });
                $this.find('.equal-elem').height(elem_height);
            }
        });
    }
}

// const showDropdownMenu  = ()=>{
//   $('.dropdown-menu').css('display', 'none');
//   console.log("this", this)
//   $(this).find('.dropdown-menu').css('display', 'table');
//   // if( $(this).find(".dropdown-menu .dropdown-banner-wrapper").outerHeight() < $(this).find('.dropdown-menu').height() && $ww >= 992 ){
//   //     $(this).find(".dropdown-menu .dropdown-banner-wrapper").outerHeight($(this).find('.dropdown-menu').height());
//   // }
// }


const kt_tab_fadeeffect = () =>{
  // effect click
  $(document).on('click','.kt-tab-fadeeffect a[data-toggle="pill"]',function(){
    var item = '.product-item';
    var tab_id = $(this).attr('href');
    var tab_animated = $(this).data('animated');
    tab_animated = ( tab_animated == undefined ) ? 'fadeInUp' : tab_animated;

    if( $(tab_id).find('.owl-carousel').length > 0 ){
      item = '.owl-item.active';
    }
    $(tab_id).find(item).each(function(i){
      var t = $(this);
      var style = $(this).attr("style");
      style = ( style == undefined ) ? '' : style;
      var delay  = i * 200;
      t.attr("style", style +
                ";-webkit-animation-delay:" + delay + "ms;"
              + "-moz-animation-delay:" + delay + "ms;"
              + "-o-animation-delay:" + delay + "ms;"
              + "animation-delay:" + delay + "ms;"
      ).addClass(tab_animated+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          t.removeClass(tab_animated+' animated');
          t.attr("style", style);
      });
    })
  })
}

const newletter_popup = ()=>{
     if($(window).width() + kt_get_scrollbar_width() > 1024){
       if($('body').hasClass('home')){
            $.magnificPopup.open({
               items: {
                src: '<div class="kt-popup-newsletter container"><div class="popup-content"><h4 class="sub-title">Join Our Email Letter</h4><h5 class="title">TAKE <span> 25% OFF</span> YOUR NEXT PURCHASE ! </h5><div class="sex-checkbox"><input class="sex" type="radio" value="checked" name="checkbox"><span class="women">Women</span><input class="sex" type="radio" value="" name="checkbox"><span>Men</span> </div><div class="search-block inner-content"><div class="search-inner"><input type="text" class="search-info" placeholder="Enter your email address here." name="search-info"><a href="#" class="search-button">Subscribe!</a></div></div><p class="note"><span> No Thank ! I’m not interested in this promotion </span><br>Entering your email also subscribe you to the latest RiverSide news and offers * </p><div class="dontshow"><input type="checkbox" class="checkbox"><span class="hidden-popup">Don’t show this popup again !</span></div></div></div></div>',
                type: 'inline'
             }
             });
         }
    }
  }

  const kt_get_scrollbar_width = ()=> {
    var $inner = $('<div style="width: 100%; height:200px;">test</div>'),
        $outer = $('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
        inner = $inner[0],
        outer = $outer[0];
    $('body').append(outer);
    var width1 = parseFloat(inner.offsetWidth);
    $outer.css('overflow', 'scroll');
    var width2 = parseFloat(outer.clientWidth);
    $outer.remove();
    return (width1 - width2);
  }

  const kt_countdown = ()=>{
    if($('.kt-countdown').length >0){
      var labels = ['Years', 'Months', 'Weeks', 'Days', 'Hrs', 'Mins', 'Secs'];
      var layout = '<span class="box-count day"><ul><li class="number">{dnn}</li> <li class="text">Days</li></ul></span><span class="dot">:</span><span class="box-count hrs"><ul><li class="number">{hnn}</li> <li class="text">Hrs</li></ul></span><span class="dot">:</span><span class="box-count min"><ul><li class="number">{mnn}</li> <li class="text">Mins</li></ul></span><span class="dot">:</span><span class="box-count secs"><ul><li class="number">{snn}</li> <li class="text">Secs</li></ul></span>';
      $('.kt-countdown').each(function() {
        var austDay = new Date($(this).data('y'),$(this).data('m') - 1,$(this).data('d'),$(this).data('h'),$(this).data('i'),$(this).data('s'));
        $(this).countdown({
          until: austDay,
          labels: labels, 
          layout: layout
        });
      });
    }
  }; 
 

  const kt_resizeMegamenu = () => {
    var window_size = parseFloat($('body').innerWidth());
    window_size += kt_get_scrollbar_width();
    if( window_size > 991 ){
      if( $('.container-wapper .main-menu').length > 0){
        var container = $('.main-menu-wapper');
        if( container!= 'undefined'){
          var container_width = 0;
          container_width = parseFloat(container.innerWidth());
          var container_offset = 0;
          container_offset = container.offset();
          setTimeout(function(){
            $('.main-menu .menu-item-has-children').each(function(index,element){
              $(element).children('.mega-menu').css({'max-width':container_width+'px'});
              var sub_menu_width = parseFloat($(element).children('.mega-menu').outerWidth());
              var item_width = parseFloat($(element).outerWidth());
              $(element).children('.mega-menu').css({'left':'-'+(sub_menu_width/2 - item_width/2)+'px'});
              var container_left = container_offset.left;
              var container_right = (container_left + container_width);
              var item_left = $(element).offset().left;
              var overflow_left = (sub_menu_width/2 > (item_left - container_left));
              var overflow_right = ((sub_menu_width/2 + item_left) > container_right);
              if( overflow_left ){
                var left = (item_left - container_left);
                $(element).children('.mega-menu').css({'left':-left+'px'});
              }
              if( overflow_right && !overflow_left ){
                var left = (item_left - container_left);
                left = left - ( container_width - sub_menu_width );
                $(element).children('.mega-menu').css({'left':-left+'px'});
              }
            })
          },100);
        }
      }
    }
  }

  // Sticky menu
  export const sticky_menu = () =>{
      if($(window).width() > 1024) {
          if(!$('#navbar').hasClass('no-sticky')) {              
              if ($(window).scrollTop() > 200) {
                $('#navbar').addClass('is-sticky');
                 $('#navbar').addClass('sticky-run');
                 $('.navbar-right').show();
              } 
              else {
                $('.navbar-right').hide();
                $('#navbar').removeClass('sticky-run');
              }
              if($(window).scrollTop() < 180){
                $('.navbar-right').hide();
                $('#navbar').removeClass('is-sticky');
              }
          }
      }
   }

  const kt_verticalMegamenu = ()=>{
      var window_size = parseFloat($('body').innerWidth());
      window_size += kt_get_scrollbar_width();
      if( window_size > 991 ){
          if( parseFloat($('.container-wapper .vertical-menu').length) >0){
              var container = $('.container-wapper');
              if( container!= 'undefined'){
                  var container_width = 0;
                  container_width = parseFloat(container.innerWidth());
                  var container_offset = 0;
                  container_offset = container.offset();
                  var content_width = 0;
                  content_width = parseFloat($('.vertical-wapper ').outerWidth());
                  setTimeout(function(){
                      $('.vertical-menu .menu-item-has-children').each(function(index,element){
                           $(element).children('.mega-menu').css({'width':container_width - content_width + 30 + 'px'});
                      })
                  },100);
              }
          }
      }
  }

const withState = connect(
  (state) => {return state.locale},
  (dispatch) => ({
    addToCart(id){
      dispatch(addToCartAstrum({ id, quantity: 1 }))
    }
  })
)

const query = gql` 
query featuredCategories($language:String!){
  featuredCategories{
    id,
    name(language:$language),    
    products {
      id,
      name(language:$language),
      pictures,
      price
    },
    slides {
      imageUrl,
      caption, 
      linkUrl,
      title
    }    
  }
}
`
const withData = graphql(query, {options:({language}) => ({variables: { language: language } })})

export default withState(withData(ShopHome))