//////////
// STICKY KIT
//////////
(function($, APP) {
  APP.Plugins.Sticky = {
    init: function() {
      var $elements = $('.page')
        .last()
        .find('[js-sticky]');

      if ($elements.length === 0) return;

      $elements.each(function(i, sticky) {
        var $sticky = $(sticky);
        var dataOffsetTop = $sticky.data('offset-top')
          ? parseInt($sticky.data('offset-top'), 10)
          : 0;

        $sticky.stick_in_parent({
          // eslint-disable-next-line camelcase
          offset_top: dataOffsetTop,
        });
      });
    },
  };
})(jQuery, window.APP);
