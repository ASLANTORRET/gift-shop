import 'owl.carousel/dist/assets/owl.carousel.css'
import owlCarousel from 'owl.carousel/dist/owl.carousel.min'
import 'owl.carousel2.thumbs/dist/owl.carousel2.thumbs.min'
import 'magnific-popup/dist/jquery.magnific-popup.min'
import WOW from 'wowjs/dist/wow'
import mCustomScrollbar from 'jquery.scrollbar/jquery.scrollbar.min'
const $ = global.jQuery

$(document).ready(function ($) {
    "use strict";
    console.log("started2")
     
    function kt_countdown(){
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

    function kt_innit_carousel(){
        //owl has thumbs 
        $('.kt-owl-carousel.has-thumbs').owlCarousel({
            loop: true,
            items: 1,
            thumbs: true,
            thumbImage: true,
            thumbContainerClass: 'owl-thumbs',
            thumbItemClass: 'owl-thumb-item'
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
  
    function kt_tab_fadeeffect(){
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

    function newletter_popup(){
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

     // Price filter
    $('.slider-range-price').each(function(){
      var min             = parseFloat($(this).data('min'));
      var max             = parseFloat($(this).data('max'));
      var unit            = $(this).data('unit');
      var value_min       = parseFloat($(this).data('value-min'));
      var value_max       = parseFloat($(this).data('value-max'));
      var label_reasult   = $(this).data('label-reasult');
      var t               = $(this);
      $('.price-filter' ).slider({
        range: true,
        min: min,
        max: max,
        values: [ value_min, value_max ],
        slide: function( event, ui ) {
          var result = '<span class="from">'+ unit + ui.values[ 0 ] +' </span><span class="to"> '+ unit +ui.values[ 1 ]+'</span>';
          t.closest('.price-filter').find('.amount-range-price').html(result);
        }
      });
    });
    
    //Woocommerce plus and minius
    $(document).on('click', '.quantity .plus, .quantity .minus', function (e) {
        // Get values
        var $qty = $(this).closest('.quantity').find('.qty'),
            currentVal = parseFloat($qty.val()),
            max = parseFloat($qty.attr('max')),
            min = parseFloat($qty.attr('min')),
            step = $qty.attr('step');
        // Format values
        if (!currentVal || currentVal === '' || currentVal === 'NaN') currentVal = 0;
        if (max === '' || max === 'NaN') max = '';
        if (min === '' || min === 'NaN') min = 0;
        if (step === 'any' || step === '' || step === undefined || parseFloat(step) === 'NaN') step = 1;
        // Change the value
        if ($(this).is('.plus')) {
            if (max && ( max == currentVal || currentVal > max )) {
                $qty.val(max);
            } else {
                $qty.val(currentVal + parseFloat(step));
            }
        } else {
            if (min && ( min == currentVal || currentVal < min )) {
                $qty.val(min);
            } else if (currentVal > 0) {
                $qty.val(currentVal - parseFloat(step));
            }
        }
        // Trigger change event
        $qty.trigger('change');
        e.preventDefault();
    });

    $('.add-mark').on( "click", function(e) {
        $(this).closest('.header').find('.has-mark').addClass('show-mark');
        return false;
    });
    $('.remove-mark').on( "click", function(e) {
        $(this).closest('.header').find('.has-mark').removeClass('show-mark');
        return false;
    });
    $('.show-content').on( "click", function(e) {
        $(this).closest('.parent-content').find('.inner-content').addClass('show');
        return false;
    });
    $('.hidden-content').on( "click", function(e) {
        $(this).closest('.inner-content').removeClass('show');
         return false;
    });
    $('.toggle-submenu').on( "click", function(e) {
        $(this).closest('.menu-item-has-children').toggleClass('show-submenu');
         return false;
    });
    $('.toggle-button').on( "click", function(e) {
        $(this).closest('.parent-content').find('.toggle-content').toggleClass('show');
         return false;
    });

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

    function kt_get_scrollbar_width() {
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

    function kt_resizeMegamenu(){
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
    function sticky_menu(){
        if($(window).width() > 1024) {
            if(!$('.header').hasClass('no-sticky')) {
                if ($(window).scrollTop() > 150) {
                    $('.header').addClass('is-sticky');
                } 
                else {
                    $('.header').removeClass('is-sticky');
                }
                if ($(window).scrollTop() > 250) {
                    $('.header').addClass('sticky-run');
                } 
                else {
                    $('.header').removeClass('sticky-run');
                }
            }
        }
     }

    function kt_verticalMegamenu(){
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

 
    better_equal_elems();
    kt_innit_carousel(); 
    kt_tab_fadeeffect();

    $(window).on('load', function() {
        //Nav Dots Style
        $('.slideshow .kt-owl-carousel').each(function () {
            var dotnumber = 0;
            dotnumber = parseFloat($(this).find('.owl-dot').length);
            $('.slideshow .kt-owl-carousel').addClass("has-" + dotnumber + "dots");
            return true;
        });
    });
    //EQUAL ELEM
    function better_equal_elems() {
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
    function kt_scroll() {
        if($(window).outerWidth() > 0) {
            //$('.header .scrollbar').mCustomScrollbar();
        }
    }

    $(window).ready(function() {
        kt_countdown();
        kt_resizeMegamenu();
        kt_verticalMegamenu();
        newletter_popup();
        better_equal_elems();
        kt_scroll();
    });
    $(window).scroll(function() {
        //sticky_menu();
    });
    $(window).resize(function(){
        kt_resizeMegamenu();
        kt_verticalMegamenu();
        better_equal_elems();
        kt_scroll();
    });
    $(window).on('load', function(){
        better_equal_elems();
        kt_scroll();
    });
    new WOW.WOW().init();
}) 