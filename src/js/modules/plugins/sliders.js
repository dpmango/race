//////////
// SLIDERS
//////////
(function($, APP) {
  APP.Plugins.Sliders = {
    data: {
      swipers: [],
    },
    init: function() {
      this.initSwipers();
    },
    initSwipers: function() {
      // ARTICLE SWIPER
      new Swiper('[js-swiper-article]', {
        watchOverflow: true,
        setWrapperSize: false,
        spaceBetween: 0,
        slidesPerView: 1,
        normalizeSlideIndex: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
      });
    },
  };
})(jQuery, window.APP);
