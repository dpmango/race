//////////
// LAYOUT
//////////
(function($, APP) {
  APP.Plugins.LAYOUT = {
    data: {
      stickToWindow: undefined,
    },
    init: function(fromPjax) {
      this.getData();
      this.applyLayout();
      if (!fromPjax) {
        this.listenResize();
      }
    },
    getData: function() {
      this.data.stickToWindow = $('[js-stick-to-window]');
    },
    listenResize: function() {
      _window.on('resize', debounce(this.applyLayout.bind(this), 100));
    },
    applyLayout: function() {
      var _this = this;
      if (this.data.stickToWindow.length > 0) {
        var wWidth = _window.width();

        this.data.stickToWindow.each(function(i, el) {
          var $el = $(el);
          var position = $el.data('position');
          var stopWatching = $el.data('stop') ? mediaCondition($el.data('stop')) : null;
          var setMarginPx = 0;

          if (stopWatching === null || !stopWatching) {
            // get position of element to window
            var $elPosLeft = $el.position().left;

            // set values
            if (position === 'left') {
              setMarginPx = $elPosLeft * -1;
              $el.css({ 'margin-left': setMarginPx });
            } else if (position === 'right') {
              var wWidth = window.innerWidth;
              var $elWidth = $el.innerWidth();
              var elMarginRight = Math.abs(parseInt($el.css('margin-right')));

              setMarginPx = (wWidth - $elPosLeft - ($elWidth - elMarginRight)) * -1;
              $el.css({ 'margin-right': setMarginPx });
            }
          } else {
            $el.attr('style', '');
          }
        });
      }

      // if ($('[js-layout-padding]').length > 0) {
      //   var wWidth = _window.width();
      //   var containerPadding = wWidth > 568 ? 50 : 20;

      //   $('[js-layout-padding]').each(function(i, el) {
      //     var $el = $(el);
      //     var containerWidth = $el.data('container-width') || 1250;
      //     var type = $el.data('type');
      //     var stopWatching = $el.data('stop') ? mediaCondition($el.data('stop')) : null;
      //     var setPaddingPx = 0;

      //     if (stopWatching === null || !stopWatching) {
      //       // calculate base container diff
      //       var widthDiff = wWidth - containerWidth;

      //       // if the diff within max-width: 1250 + pad - just add default padding
      //       if (widthDiff < containerPadding * 2) {
      //         setPaddingPx = containerPadding;
      //       } else {
      //         // get container diff with window size
      //         var containerDiff = widthDiff - containerPadding * 2;
      //         setPaddingPx = containerPadding + containerDiff / 2;
      //       }

      //       // set values
      //       if (type === 'container-left') {
      //         $el.css({ 'padding-left': setPaddingPx });
      //       } else if (type === 'container-right') {
      //         $el.css({ 'padding-right': setPaddingPx });
      //       }
      //     } else {
      //       $el.attr('style', '');
      //     }
      //   });
      // }
    },
  };
})(jQuery, window.APP);
