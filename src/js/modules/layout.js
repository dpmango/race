//////////
// LAYOUT
//////////
(function($, APP) {
  APP.Plugins.LAYOUT = {
    data: {
      stickToWindow: undefined,
      productionGrid: undefined,
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
      this.data.productionGrid = $('[js-production-nav-offset]');
    },
    listenResize: function() {
      _window.on('resize', debounce(this.applyLayout.bind(this), 100));
    },
    applyLayout: function() {
      var _this = this;
      if (this.data.stickToWindow.length > 0) {
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

      if (this.data.productionGrid.length > 0) {
        var $el = this.data.productionGrid;
        var stopWatching = $el.data('stop') ? mediaCondition($el.data('stop')) : null;
        var minimumSpace = 20;

        var setPaddingPx = 0;

        if (stopWatching === null || !stopWatching) {
          // get position of element to window
          var $elPosLeft = $el.position().left;

          // var get corresponding nav
          var $navEl = $('.header-nav');
          var navElRight = $navEl.position().left + $navEl.width();

          var distance = $elPosLeft - navElRight - minimumSpace;

          if (distance <= 0) {
            setPaddingPx = distance * -1;
          }

          $el.css({ 'padding-left': setPaddingPx });
        } else {
          $el.attr('style', '');
        }
      }
    },
  };
})(jQuery, window.APP);
