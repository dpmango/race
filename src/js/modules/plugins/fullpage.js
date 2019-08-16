//////////
// FULLPAGE
//////////
(function($, APP) {
  APP.Plugins.Fullpage = {
    init: function() {
      this.start();
      this.listenClicks();
      // this.listenResize();
    },
    // refresh: function() {
    // },
    listenResize: function() {
      _window.on('resize', debounce(this.start.bind(this), 200));
    },
    listenClicks: function() {
      _document
        .on('click', '[js-fullpage-top]', function() {
          $.fn.fullpage.moveTo(1);
        })
        .on('click', '[js-fullpage-prev]', function() {
          $.fn.fullpage.moveSectionUp();
        })
        .on('click', '[js-fullpage-next]', function() {
          $.fn.fullpage.moveSectionDown();
        })
        .on('click', '[js-fullpage-nav] li', function() {
          var target = $(this).data('fp-section');
          $.fn.fullpage.moveTo(target);
        });
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
        // dragAndMove: true,
        // responsiveWidth: 768,
        onLeave: function(origin, destination, direction) {
          // APP.Plugins.AOS.refreshSoft();
          $('[js-fullpage-nav] li').removeClass('is-active');
          $('[js-fullpage-nav] li[data-fp-section="' + destination + '"]').addClass('is-active');
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
