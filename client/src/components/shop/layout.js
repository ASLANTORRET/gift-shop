import React from 'react';
// import Menu from '/imports/ui/containers/shop/menu';
// import Navbar from '/imports/ui/containers/shop/navbar';

import Header from './header';
import Footer from './footer';
// import 'flexslider';
// import 'flexslider/flexslider.css';
// import numeral from 'numeral';

// import 'numeral/locales/ru.js';
// numeral.locale('ru');

//import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import 'font-awesome/css/font-awesome.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import '@fancyapps/fancybox/dist/jquery.fancybox.css'
// import 'bxslider/dist/jquery.bxslider.js';
//import 'bxslider/dist/jquery.bxslider.min.css';
// import '/public/js/fancybox/jquery.fancybox.pack.js';
// import '/public/js/fancybox/helpers/jquery.fancybox-thumbs.js';
// import '/public/shop/css/jquery.fancybox.css';

// window.getGridSize_discounts = () => {
//   return (window.innerWidth < 600) ? 1 :
//        (window.innerWidth < 1200) ? 2 : 3;
// }
// window.getGridSize_pop = () => {
//   return (window.innerWidth < 480) ? 1 :
//        (window.innerWidth < 650) ? 2 :
//        (window.innerWidth < 992) ? 3 :
//        (window.innerWidth < 1200) ? 3 : 4;
// }
// window.getGridSize_postrel = (type) => {
//   var count = 3;
//   if (type == 'type-2') {
//     count = 2;
//   }
//   return (window.innerWidth < 480) ? 1 :
//     (window.innerWidth < 650) ? 2 : count;
// }
// window.getGridSize_brands = () => {
//   return (window.innerWidth < 400) ? 1 :
//     (window.innerWidth < 550) ? 2 :
//     (window.innerWidth < 650) ? 3 :
//     (window.innerWidth < 992) ? 4 :
//     (window.innerWidth < 1200) ? 5 : 6;
// }

const Shop = ({ children, user }) => {
  return (
    <div>
      <link rel="stylesheet" type="text/css" href="/shop/css/style.css"></link>
      <link rel="stylesheet" type="text/css" href="/shop/css/template.css"></link>
      <link rel="stylesheet" type="text/css" href="/shop/css/custom-css.css"></link>      
      <link rel="stylesheet" type="text/css" href="/shop/css/animate.css"></link>      
      <link rel="stylesheet" type="text/css" href="/shop/css/flaticon.css"></link>
      <link rel="stylesheet" type="text/css" href="/shop/css/owl.carousel.css"></link>
      <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet"></link>
      <Header user={user}/>
      <main>
        { children }
      </main>
      <Footer />
    </div>
  )
}

export default Shop;
