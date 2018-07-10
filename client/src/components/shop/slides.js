import React from 'react'

import { SLIDES_QUERY } from '../../queries/slide'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import 'flexslider'
import 'flexslider/flexslider.css'

const $ = require('jquery')

const kt_innit_carousel = (props)=>{
  //owl has thumbs 
  $('.kt-owl-carousel.has-thumbs').owlCarousel({
      loop: true,
      items: 1,
  });
  // owl config
  $(".kt-owl-carousel").each(function(index, el) {
      var config = $(this).data();
      config.navText = ['<i class="flaticon-left-arrow" aria-hidden="true"></i>','<i class="flaticon-right-arrow" aria-hidden="true"></i>'];
      var animateOut = $(this).data('animateout');
      var animateIn  = $(this).data('animatein');
      var slidespeed = parseFloat($(this).data('slidespeed'));
     
      if(typeof animateOut != 'undefined' ){
          config.animateOut = animateOut;
      }
      if(typeof animateIn != 'undefined' ){
          config.animateIn = animateIn;
      }
      if(typeof (slidespeed) != 'undefined' ){
          config.smartSpeed = slidespeed;
      }

      if( $('body').hasClass('rtl')){
          config.rtl = true;
      }

       var owl = $(this);
      owl.on('initialized.owl.carousel',function(event){
          var total_active = parseInt(owl.find('.owl-item.active').length);
          var i            = 0;
          owl.find('.owl-item').removeClass('item-first item-last');
          setTimeout(function(){
              owl.find('.owl-item.active').each(function () {
                  i++;
                  if (i == 1) {
                      $(this).addClass('item-first');
                  }
                  if (i == total_active) {
                      $(this).addClass('item-last');
                  }
              });

          }, 100);
      })
      owl.on('refreshed.owl.carousel',function(event){
          var total_active = parseInt(owl.find('.owl-item.active').length);
          var i            = 0;
          owl.find('.owl-item').removeClass('item-first item-last');
          setTimeout(function(){
              owl.find('.owl-item.active').each(function () {
                  i++;
                  if (i == 1) {
                      $(this).addClass('item-first');
                  }
                  if (i == total_active) {
                      $(this).addClass('item-last');
                  }
              });

          }, 100);
      })
      owl.on('change.owl.carousel',function(event){
          var total_active = parseInt(owl.find('.owl-item.active').length);
          var i            = 0;
          owl.find('.owl-item').removeClass('item-first item-last');
          setTimeout(function(){
              owl.find('.owl-item.active').each(function () {
                  i++;
                  if (i == 1) {
                      $(this).addClass('item-first');
                  }
                  if (i == total_active) {
                      $(this).addClass('item-last');
                  }
              });

          }, 100);
          owl.addClass('owl-changed');
          setTimeout(function () {
              owl.removeClass('owl-changed');
          },config.smartSpeed)
      })
      owl.on('drag.owl.carousel',function(event){
          owl.addClass('owl-changed');
          setTimeout(function () {
              owl.removeClass('owl-changed');
          },config.smartSpeed)
      })
      owl.owlCarousel(config);

  });
}




class Slides extends React.Component {
  initSlider() {
    $('.slideshow .kt-owl-carousel').each(function () {
      var dotnumber = 1;
      dotnumber = parseFloat($(this).find('.owl-dot').length);
      $(this).closest('.slideshow .kt-owl-carousel').addClass("has-" + dotnumber + "dots");
      return true;
    });
    kt_innit_carousel()
  }
  componentDidMount() {
    this.initSlider()
  }
  componentDidUpdate() {
    this.initSlider()
  }
 
  render() {
    const { slides } = this.props
    return <div className={`slideshow slideshow-style1 ${slides.length > 1} slide1-1 dots-style1`}>
      <div className="kt-owl-carousel has-thumbs owl-carousel owl-theme">
        {slides.map((slide, key)=>(
            <div className="item-slide" key={key}>
            <div className="main-img">
              <img src={"/shop/img/slide/" + slide.imageUrl} alt={slide.title} />
            </div>
                         
              {/* <h4 className="sub-title uppercase">Bestseller EMPIRE</h4>
              <h3 className="title uppercase">Коллекция «Казахи»</h3> */}
              {/* {slides.length > 1
                && 
                (<div className="slide-content content-slide-01"> 
                    <h2 className="caption" dangerouslySetInnerHTML={{__html: slide.caption}}></h2>
					<h3 className="title" dangerouslySetInnerHTML={{__html: slide.title}}></h3>
                 {/*   <Link className="goto-lookbook" to={slide.linkUrl}>Подробнее</Link> }
                </div>) 
                } */}
            </div>
        ))}
      </div>
    </div>
  }
}

// const withData = graphql(SLIDES_QUERY, {
//   props({ data: { loading, slides} }) {
//     if (loading)
//       return {loading}
//     return {slides}
//   }
// })

// export default withData(Slides)

export default Slides