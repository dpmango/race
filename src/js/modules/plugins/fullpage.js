//////////
// FULLPAGE
//////////
(function($, APP) {
  APP.Plugins.Fullpage = {
    init: function() {
      this.start();
      // this.listenResize();
    },
    // refresh: function() {
    // },
    listenResize: function() {
      _window.on('resize', debounce(this.start.bind(this), 200));
    },

    start: function() {
      var $fullpageDesktop = $('.page')
        .last()
        .find('[js-fullpage]');

      if ($fullpageDesktop.length === 0) {
        $('html').removeClass('fp-enabled');
        $('html').attr('style', '');
        return;
      }

      // https://github.com/alvarotrigo/fullpage.js
      var defaultFpOptions = {
        // scrollOverflow: true,
        // scrollOverflowReset: true,
        // responsiveWidth: 768,
        onLeave: function(origin, destination, direction) {
          // APP.Plugins.AOS.refreshSoft();
        },
        // afterLoad: function(origin, destination, direction) {},
        // afterRender: function() {},
        // afterResize: function(width, height) {},
        // afterReBuild: function() {},
        // afterResponsive: function(isResponsive) {},
        // afterSlideLoad: function(section, origin, destination, direction) {},
        // onSlideLeave: function(section, origin, destination, direction) {},
      };

      $fullpageDesktop.addClass('is-enabled');
      $fullpageDesktop.fullpage(defaultFpOptions);

      // if (window.innerWidth <= 768) {
      //   if (!$fullpageDesktop.hasClass('is-enabled')) {
      //     $fullpageDesktop.addClass('is-enabled');
      //     $fullpageDesktop.fullpage(defaultFpOptions);
      //   }
      // } else {
      //   if ($fullpageDesktop.hasClass('is-enabled')) {
      //     $fullpageDesktop.removeClass('is-enabled');
      //     $.fn.fullpage.destroy('all');
      //   }
      // }
    },
  };
})(jQuery, window.APP);
