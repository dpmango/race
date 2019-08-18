//////////
// SLIDERS
//////////
(function($, APP) {
  APP.Plugins.Sliders = {
    data: {
      swipers: [],
      responsiveSwipers: {
        homeNews: {
          instance: undefined,
          disableOn: 1024,
        },
        homeNavMenu: {
          instances: [undefined, undefined, undefined],
          disableOn: 1024,
        },
        homeSections: {
          instance: undefined,
          disableOn: 576,
        },
      },
    },
    init: function() {
      // this.initSwipers();
      this.initResponsiveSwipers();
      this.listenResize();
    },
    reinit: function() {
      // without resize listeners double check
      // this.initSwipers();
      this.initResponsiveSwipers(true);
    },
    listenResize: function() {
      _window.on('resize', debounce(this.initResponsiveSwipers.bind(this), 200));
    },
    initSwipers: function() {
      // EXAMPLE SWIPER
      // new Swiper('[js-slider]', {
      //   wrapperClass: 'swiper-wrapper',
      //   slideClass: 'example-slide',
      //   direction: 'horizontal',
      //   loop: false,
      //   watchOverflow: true,
      //   setWrapperSize: false,
      //   spaceBetween: 0,
      //   slidesPerView: 'auto',
      //   // loop: true,
      //   normalizeSlideIndex: true,
      //   // centeredSlides: true,
      //   freeMode: true,
      //   // effect: 'fade',
      //   autoplay: {
      //     delay: 5000,
      //   },
      //   navigation: {
      //     nextEl: '.example-next',
      //     prevEl: '.example-prev',
      //   },
      //   breakpoints: {
      //     // when window width is <= 992px
      //     992: {
      //       autoHeight: true,
      //     },
      //   },
      // });
    },

    initResponsiveSwipers: function(isHardReset) {
      var homeNews = '[js-home-news-swiper]';
      if ($(homeNews).length > 0) {
        this.initHomeNewsSwiper(homeNews);
      }
      var homeSlider = '[js-home-swiper]';
      if ($(homeSlider).length > 0) {
        this.initHomeSwiper(homeSlider);
      }
      var homeNavmenu = '[js-home-navmenu-swiper]';
      if ($(homeNavmenu).length > 0) {
        this.initHomeNavMenuSwiper(homeNavmenu, isHardReset);
      }
    },
    initHomeNewsSwiper: function(selector) {
      var dataObj = this.data.responsiveSwipers.homeNews;

      if ($(selector).length > 0) {
        if (window.innerWidth >= dataObj.disableOn) {
          if (dataObj.instance !== undefined) {
            dataObj.instance.destroy(true, true);
            dataObj.instance = undefined;
          }
        } else {
          if (dataObj.instance === undefined) {
            dataObj.instance = new Swiper(selector, {
              watchOverflow: true,
              setWrapperSize: false,
              spaceBetween: 0,
              slidesPerView: 'auto',
              normalizeSlideIndex: true,
            });
          }
        }
      }
    },
    initHomeNavMenuSwiper: function(selector, isHardReset) {
      // may have multiple intances
      var dataObj = this.data.responsiveSwipers.homeNavMenu;
      var $selectorObjects = $(selector);
      var someInstanceUndefined = false;
      $.each(dataObj.instances, function(i, instance) {
        if (instance === undefined) {
          someInstanceUndefined = true;
        }
      });

      // destroy / init all instances
      if ($selectorObjects.length > 0) {
        if (window.innerWidth >= dataObj.disableOn) {
          $.each(dataObj.instances, function(i, instance) {
            if (instance !== undefined) {
              instance.destroy(true, true);
              dataObj.instances[i] = undefined;
            }
          });
        } else {
          if (someInstanceUndefined || isHardReset) {
            $selectorObjects.each(function(i, selector) {
              // console.log('try initialization', dataObj.instances[i], selector);
              dataObj.instances[i] = new Swiper(selector, {
                watchOverflow: true,
                setWrapperSize: false,
                spaceBetween: 0,
                slidesPerView: 'auto',
                normalizeSlideIndex: true,
                slidesOffsetAfter: 15,
              });
            });
          }
        }
      }
    },
    initHomeSwiper: function(selector) {
      var dataObj = this.data.responsiveSwipers.homeSections;

      if ($(selector).length > 0) {
        if (window.innerWidth >= dataObj.disableOn) {
          if (dataObj.instance !== undefined) {
            dataObj.instance.destroy(true, true);
            dataObj.instance = undefined;
          }
        } else {
          if (dataObj.instance === undefined) {
            dataObj.instance = new Swiper(selector, {
              setWrapperSize: false,
              slidesPerView: 1,
              normalizeSlideIndex: true,
              pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
              },
            });
          }
        }
      }
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
