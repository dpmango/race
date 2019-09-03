//////////
// LAYOUT
//////////
(function($, APP) {
  APP.Plugins.CustomParallax = {
    data: {
      pBgElements: [],
    },
    init: function(fromPjax) {
      if (!APP.Browser().data.isIe) {
        this.getData();
        if (!fromPjax) {
          this.listenResize();
          this.listenScroll();
        }
      }
    },
    getData: function() {
      var _this = this;
      var $pBgElements = $('.page')
        .last()
        .find('[js-parallax-scale-background]');
      _this.data.pBgElements = [];
      if ($pBgElements.length === 0) return;

      $pBgElements.each(function(i, element) {
        var $element = $(element);

        _this.data.pBgElements.push({
          $element: $element,
          $image: $element.find('img, picture'),
          offsetTop: $element.offset().top,
          height: $element.outerHeight(),
          scalePower: $element.data('scale-power'),
        });
      });

      // set initials
      this.parallaxBackground();
    },
    listenResize: function() {
      _window.on('scroll', debounce(this.getData.bind(this), 100));
    },
    listenScroll: function() {
      _window.on('scroll', throttle(this.parallaxBackground.bind(this), 300));
    },
    parallaxBackground: function() {
      var _this = this;
      if (this.data.pBgElements.length > 0) {
        // get scroll params from blocker function
        var scroll = APP.Plugins.ScrollBlock.getData();
        var wHeight = window.innerHeight;

        if (scroll.blocked) return;

        $.each(this.data.pBgElements, function(i, element) {
          var bScroll = scroll.y + wHeight;
          var elementEndPoint = element.offsetTop + element.height + wHeight;

          if (bScroll > element.offsetTop && bScroll < elementEndPoint) {
            var scrollPercent = Math.floor(
              normalize(bScroll, element.offsetTop, elementEndPoint, 0, 100)
            );
            var scrollPercent100 = scrollPercent / 100;
            var scaleTarget = 1 + scrollPercent100 / element.scalePower;

            // TweenLite.to(element.$image, 0.3, {
            //   scale: scaleTarget,
            //   ease: Back.easeOut.config(1.7),
            // });
            element.$image.css({
              transform: 'scale(' + scaleTarget + ')',
            });
          } else if (bScroll > elementEndPoint) {
            // TweenLite.to(element.$image, 0.3, {
            //   scale: element.scalePower,
            //   ease: Back.easeOut.config(1.7),
            // });
            element.$image.css({
              transform: 'scale(' + element.scalePower + ')',
            });
          } else {
            element.$image.attr('style', '');
          }
        });
      }
    },
  };
})(jQuery, window.APP);
