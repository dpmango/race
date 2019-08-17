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
      },
    },
    init: function() {
      this.initSwipers();
      this.initResponsiveSwipers();
      this.listenResize();
    },
    listenResize: function() {
      _window.on('resize', debounce(this.initResponsiveSwipers.bind(this), 200));
    },
    initSwipers: function() {
      // EXAMPLE SWIPER
      new Swiper('[js-slider]', {
        wrapperClass: 'swiper-wrapper',
        slideClass: 'example-slide',
        direction: 'horizontal',
        loop: false,
        watchOverflow: true,
        setWrapperSize: false,
        spaceBetween: 0,
        slidesPerView: 'auto',
        // loop: true,
        normalizeSlideIndex: true,
        // centeredSlides: true,
        freeMode: true,
        // effect: 'fade',
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: '.example-next',
          prevEl: '.example-prev',
        },
        breakpoints: {
          // when window width is <= 992px
          992: {
            autoHeight: true,
          },
        },
      });
    },

    initResponsiveSwipers: function() {
      var homeNews = '[js-home-news-swiper]';
      if ($(homeNews).length > 0) {
        this.initHomeNewsSwiper(homeNews);
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
              freeMode: true,
              freeModeSticky: true,
              // breakpoints: {
              //   992: {
              //     spaceBetween: 0,
              //   },
              // },
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
