 jQuery(function() {
     "use strict";

     //Parallax Background pattern
     skrollr.init({
         mobileCheck: function() {
             //hack - forces mobile version to be off
             return false;
         },
         forceHeight: false
     });
     
     //RTL FIX
     function bs_fix_vc_full_width_row(){
        var $elements = jQuery('body.rtl [data-vc-full-width="true"]');
        jQuery.each($elements, function () {
            var $el = jQuery(this);
           // $el.css('right', $el.css('left')).css('left', '');
            $el.css('right','auto') ;
        });
    }

    // Fixes rows in RTL
    jQuery(document).on('vc-full-width-row', function () {
        bs_fix_vc_full_width_row();
    });

    // Run one time because it was not firing in Mac/Firefox and Windows/Edge some times
    bs_fix_vc_full_width_row();

     //Menu
     if (jQuery(".classic-menu").length) {

         var menu = jQuery('.classic-menu'),
             pos = menu.offset();

         jQuery(window).scroll(function() {
             if (jQuery(this).scrollTop() > pos.top + menu.height()) {
                 jQuery('.classic-menu').addClass('mobile-sticky');
             } else if (jQuery(this).scrollTop() <= pos.top) {
                 jQuery('.classic-menu').removeClass('mobile-sticky');
             }

             if (jQuery(this).scrollTop() > pos.top + menu.height() && menu.hasClass('sticky-menu')) {
                 jQuery('.sticky-menu').addClass('sticky');
                 //});
             } else if (jQuery(this).scrollTop() <= pos.top && menu.hasClass('sticky')) {
                 menu.fadeOut('fast', function() {
                     jQuery(this).removeClass('sticky').fadeIn('fast');
                 });
             }
         });
     }

     var masthead, menuToggle, siteNavContain, siteNavigation;

     function initMainNavigation(container) {
         // Add dropdown toggle that displays child menu items.
         var dropdownToggle = jQuery('<button />', {
                 'class': 'dropdown-toggle',
                 'aria-expanded': false
             })
             .append("")
             .append(jQuery('<span />', {
                 'class': 'screen-reader-text',
                 text: ""
             }));

         container.find('.menu-item-has-children > a, .page_item_has_children > a').after(dropdownToggle);

         // Set the active submenu dropdown toggle button initial state.
         container.find('.current-menu-ancestor > button')
             .addClass('toggled-on')
             .attr('aria-expanded', 'true')
             .find('.screen-reader-text')
             .text("");
         // Set the active submenu initial state.
         container.find('.current-menu-ancestor > .sub-menu').addClass('toggled-on');
         container.find('.dropdown-toggle').on("click", function(e){
             var _this = jQuery(this);
             e.preventDefault();
             _this.toggleClass('toggled-on');
             _this.next('.children, .sub-menu').toggleClass('toggled-on');
             _this.attr('aria-expanded', _this.attr('aria-expanded') === 'false' ? 'true' : 'false');

         });
     }

     initMainNavigation(jQuery('.primary-menu'));

     if (jQuery(".menu-logo-wrapper ").length) {
         jQuery(window).scroll(function() {

             if (jQuery(this).scrollTop() > 100) {
                 jQuery('.menu-logo-wrapper ').fadeOut();
             } else {
                 jQuery('.menu-logo-wrapper ').fadeIn();
             }
         });

     }


     var musicPlayer = jQuery("#music-wrapper");
     var playList = jQuery("#play-list");
     var showPlayList = jQuery("#show-play-list");
     var playListButton = jQuery("#show-play-list .button");

     if (jQuery("#background").length) {
         var l = document.getElementById("background");
         new Parallax(l);

     }

     //Shop home text effects
     if (jQuery("#fittext-shop-home").length) {
         jQuery('.tlt').textillate({
             loop: !0,
             in: {
                 effect: "fadeIn",
                 delayScale: 1.5,
                 delay: 90
             },
             out: {
                 effect: "flipInY",
                 delayScale: 1.5,
                 delay: 50,
                 sync: !1,
                 shuffle: !1,
                 reverse: !1,
                 callback: function() {}
             }
         });

     }

     jQuery(".shop-album-image img").on("hover",
         function() {
             jQuery(this).addClass("image-hover-effect");
         },
         function() {
             jQuery(this).removeClass("image-hover-effect");
         }
     );

     if (jQuery("#fittext-home").length && (jQuery(".tlt").textillate({
             loop: !0,
             out: {
                 effect: "flipInY",
                 delayScale: 1.5,
                 delay: 50,
                 sync: !1,
                 shuffle: !1,
                 reverse: !1,
                 callback: function() {}
             }
         }), jQuery(".tlt-2").textillate({
             loop: !0,
             in: {
                 effect: "bounceInDown",
                 delayScale: 1.5,
                 delay: 90
             },
             out: {
                 effect: "fadeOut",
                 delayScale: 1.5,
                 delay: 50,
                 sync: !1,
                 shuffle: !1,
                 reverse: !1,
                 callback: function() {}
             }
         })), jQuery("#artist-profile").length) l = document.getElementById("artist-profile"), new Parallax(l);
     
     //Music player 
     musicPlayer.length && (jQuery(function() {
             var audioPlay = audiojs.createAll({
                     trackEnded: function() {
                         var nextTrack = jQuery("ol li.playing").next();
                         if (nextTrack.length || (nextTrack = jQuery("ol li").first())) {
                             nextTrack.addClass("playing").siblings().removeClass("playing");
                             audioPlay.load(jQuery("a", nextTrack).attr("data-src"));
                             audioPlay.play();
                         }
                     }
                 })[0],
                 a = jQuery("ol a").attr("data-src");
             setTimeout(function() {
                 if (jQuery("#music-wrapper .audiojs").hasClass("playing")) {
                     jQuery("#music-wrapper #equalizer").addClass("active");
                 }
             }, 3000);

             jQuery("#music-wrapper ol li").first().addClass("playing"), audioPlay.load(a), jQuery("#music-wrapper ol li").on("click", function(a) {
                     a.preventDefault(), jQuery(this).addClass("playing").siblings().removeClass("playing"), audioPlay.load(jQuery("a", this).attr("data-src")), audioPlay.play();
                     if (jQuery("#music-wrapper .audiojs").hasClass("playing")) {
                         jQuery("#music-wrapper #equalizer").addClass("active");
                     }

                 }), jQuery("#music-wrapper #next").on("click", function(e) {
                     var nextTrack = jQuery("li.playing").next();
                     if (jQuery("#music-wrapper .audiojs").hasClass("playing")) {
                         jQuery("#music-wrapper #equalizer").addClass("active");
                     }
                     nextTrack.length || (nextTrack = jQuery("ol li").first()), nextTrack.trigger("click")
                 }), jQuery("#music-wrapper #prev").on("click", function(e) {
                     var prevTrack = jQuery("li.playing").prev();
                     if (jQuery("#music-wrapper .audiojs").hasClass("playing")) {
                         jQuery("#music-wrapper #equalizer").addClass("active");
                     }
                     prevTrack.length || (prevTrack = jQuery("ol li").last()), prevTrack.trigger("click")
                 }), showPlayList.on("click", function(e) {
                     playList.toggleClass("active"), playListButton.toggleClass("active")
                 }), jQuery(window).on("click", function(e) {
                     "music-wrapper" !== !e.target.id && jQuery(e.target).parents("#music-wrapper").size() || playList.hasClass("active") && (playList.removeClass("active"), playListButton.toggleClass("active"))
                 }),
                 jQuery('#music-wrapper .play-pause').on('click', function(e) {
                     setTimeout(function() {
                         if (jQuery('#music-wrapper').find('.audiojs.playing').length !== 0) {
                             jQuery("#music-wrapper #equalizer").addClass("active");
                         } else {
                             jQuery("#music-wrapper #equalizer").removeClass("active");
                         }
                     }, 500);
                 })
         }),

         jQuery(window).scroll(function() {
             jQuery(window).scrollTop() <= 100 ? jQuery("#music-wrapper").addClass("active") : jQuery("#music-wrapper").removeClass("active")
         })), jQuery(".navigation-wrapper ul:first-child").attr("class", "menu-list"), jQuery(".menu-toogle-wrapper").on("click", function() {
         jQuery(".navigation-wrapper ul:first-child").toggleClass("active"), jQuery(".menu-toogle-wrapper").toggleClass("close"), jQuery(".navigation-wrapper").toggleClass("active")
     }), jQuery(".full-page-menu .menu-item a").on("click", function() {
         jQuery(this).parent().hasClass("menu-item-has-children") || setTimeout(function() {
             jQuery(".navigation-wrapper ul:first-child").toggleClass("active"), jQuery(".menu-toogle-wrapper").toggleClass("close"), jQuery(".navigation-wrapper").toggleClass("active");
             var e = jQuery("#primary-menu");
             e.hasClass("open") ? e.removeClass("open") : e.addClass("open")
         }, 300)
     }), jQuery("#normal-menu").prepend('<div id="menu-button"></div>'), jQuery("#menu-button").on("click", function() {
         var e = jQuery("#primary-menu");
         jQuery("#menu-button").toggleClass("close")
         e.hasClass("open") ? e.removeClass("open") : e.addClass("open")
     }), jQuery(".menu-toogle-wrapper").on("click", function() {
         var e = jQuery("#primary-menu");
         e.hasClass("open") ? e.removeClass("open") : e.addClass("open")
     }), jQuery("#normal-menu div:nth-of-type(2)>div>ul>li").on("click", function() {
         jQuery("#normal-menu div:nth-of-type(2)>div>ul>li").not(this).removeClass("active-sub-menu"), jQuery(this).toggleClass("active-sub-menu")
     }), jQuery("#normal-menu div:nth-of-type(2)>div>ul>li>ul>li").on("click", function() {
         event.stopPropagation(),
             jQuery("#normal-menu div:nth-of-type(2)>div>ul>li>ul>li").not(this).removeClass("active-inside-sub-menu"), jQuery(this).toggleClass("active-inside-sub-menu")
     }), jQuery(".menu-list>li").on("click", function() {
         jQuery(".menu-list>li").not(this).removeClass("active-sub-menu"), jQuery(this).toggleClass("active-sub-menu")
     }), jQuery(".menu-list>li>ul>li").on("click", function() {
         event.stopPropagation(), jQuery(".menu-list>li>ul>li").not(this).removeClass("active-inside-sub-menu"), jQuery(this).toggleClass("active-inside-sub-menu")
     }), jQuery(".preloader").fadeOut(1e3)
 }), window.onbeforeunload = function() {
     jQuery(".preloader").fadeIn(500)
 };

  jQuery(document).ready(function(e) {
     var a = e(window),
         t = e(".scrollup");
     a.scroll(function() {
         a.scrollTop() > 500 ? t.addClass("show") : t.removeClass("show")
     }), t.on("click", function(a) {
         e("html, body").animate({
             scrollTop: 0
         }, 600), a.preventDefault()
     })


 });


 jQuery(document).ready(function() {
     setTimeout(function() {
         if (jQuery("audio").length) {
             jQuery("audio").attr("data-autoplay", "");
         }

     }, 100);
     setTimeout(function() {
         if (jQuery("#fullpage").length) {
             createFullpage();
         }

     }, 200);
     
     //HIT CHART Page
     function createFullpage() {
         jQuery('#fullpage').fullpage({
             scrollBar: false,
             navigation: true,
             css3: true,
             fadingEffect: true,
             verticalCentered: true,
             scrollOverflow: true,
             parallaxOptions: {
                 type: 'reveal',
                 percentage: 62,
                 property: 'translate'
             },
             scrollingSpeed: 1000,
             'afterLoad': function(anchorLink, index) {
              var sectionElement = jQuery('.section').eq(index - 1);

             },
             'onLeave': function(index, nextIndex, direction) {
                 var sectionElement = jQuery('.section').eq(index);
                 if (jQuery(".wavesurfer-play").length) {
                     jQuery(sectionElement).find(".wavesurfer-play").removeClass('wavesurfer-active-button');
                 }

             },
         });
     }

 });

 jQuery(window).load(function() {
     if (jQuery('#music-wrapper').length) {
         if (jQuery("#music-wrapper .audiojs").hasClass("playing")) {
             jQuery("#music-wrapper #equalizer").addClass("active");
         }
     }

 });