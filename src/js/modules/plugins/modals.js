//////////
// MODALS
//////////
(function($, APP) {
  APP.Plugins.Modals = {
    data: {
      shared: {
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'mfp-zoom-in',
      },
    },
    init: function() {
      var startWindowScroll = 0;
      var _this = this;
      $('[js-popup]').magnificPopup(
        $.extend(_this.data.shared, {
          callbacks: {
            // beforeOpen: function() {
            //   // startWindowScroll = _window.scrollTop();
            //   // $('html').addClass('mfp-helper');
            // },
            // close: function() {
            //   // $('html').removeClass('mfp-helper');
            //   _window.scrollTop(startWindowScroll);
            // },
          },
        })
      );

      _document.on('click', '.js-close-modal', function() {
        $.magnificPopup.close();
      });

      $('[js-popup-gallery]').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка #%curr%...',
        mainClass: 'popup-buble',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1],
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        },
      });
    },
    openMfp: function(sourceSeledctor) {
      var _this = this;
      $.magnificPopup.open(
        $.extend(_this.data.shared, {
          items: {
            src: sourceSeledctor,
          },
          type: 'inline',
        })
      );
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
