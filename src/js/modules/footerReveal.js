// //////////////////
// FOOTER REVEAL
// //////////////////
(function($, APP) {
  APP.Plugins.FooterReveal = {
    data: {
      footerHeight: undefined,
    },
    init: function(fromPjax) {
      if (!fromPjax) {
        this.getData();
        this.listenResize();
      }
      this.revealFooter();
    },
    getData: function() {
      var footer = $('[js-reveal-footer]').last();
      this.data.footerHeight = footer.outerHeight();
    },
    listenResize: function() {
      _window.on('resize', throttle(this.getData.bind(this), 50));
      _window.on('resize', throttle(this.revealFooter.bind(this), 100));
    },
    revealFooter: function() {
      var footer = $('[js-reveal-footer]');
      var haveFullpage =
        $('.page')
          .last()
          .find('[js-fullpage]').length > 0;

      if (footer.length > 0) {
        var footerHeight = this.data.footerHeight;
        var maxHeight = _window.height() - footerHeight > 100;
        if (
          maxHeight &&
          !APP.Browser().data.isIe &&
          !haveFullpage &&
          window.innerWidth > 576 &&
          !APP.Browser().data.isMobile
        ) {
          $('body').css({
            'margin-bottom': footerHeight,
          });
          footer.css({
            position: 'fixed',
            'z-index': -10,
          });
        } else {
          $('body').css({
            'margin-bottom': 0,
          });
          // footer.css({
          //   position: 'static',
          //   'z-index': 7,
          // });
          footer.attr('style', '');
        }
      }
    },
  };
})(jQuery, window.APP);
