////////////////////
// CUSTOM CURSOR
////////////////////
(function($, APP) {
  APP.Plugins.CustomCursor = {
    init: function() {
      this.initCursor();
      this.initHoversCircle();
      this.initHoversMain();
    },
    initCursor: function() {
      const { Back } = window;
      this.outerCursor = document.querySelector('.circle-cursor--outer');
      this.innerCursor = document.querySelector('.circle-cursor--inner');
      this.outerCursorBox = this.outerCursor.getBoundingClientRect();
      this.outerCursorSpeed = 0;
      this.easing = Back.easeOut.config(1.7);
      this.clientX = -100;
      this.clientY = -100;
      this.showCursor = false;

      const unveilCursor = () => {
        TweenMax.set(this.innerCursor, {
          x: this.clientX,
          y: this.clientY,
        });
        TweenMax.set(this.outerCursor, {
          x: this.clientX - this.outerCursorBox.width / 2,
          y: this.clientY - this.outerCursorBox.height / 2,
        });
        setTimeout(() => {
          this.outerCursorSpeed = 0.2;
        }, 100);
        this.showCursor = true;
      };
      document.addEventListener('mousemove', unveilCursor);

      document.addEventListener('mousemove', e => {
        this.clientX = e.clientX;
        this.clientY = e.clientY;
      });

      const render = () => {
        TweenMax.set(this.innerCursor, {
          x: this.clientX,
          y: this.clientY,
        });
        if (!this.isStuck) {
          TweenMax.to(this.outerCursor, this.outerCursorSpeed, {
            x: this.clientX - this.outerCursorBox.width / 2,
            y: this.clientY - this.outerCursorBox.height / 2,
          });
        }
        if (this.showCursor) {
          document.removeEventListener('mousemove', unveilCursor);
        }
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    },

    initHoversCircle: function() {
      const handleMouseEnter = e => {
        this.isStuck = true;
        const target = e.currentTarget;
        const box = target.getBoundingClientRect();
        this.outerCursorOriginals = {
          width: this.outerCursorBox.width,
          height: this.outerCursorBox.height,
        };

        TweenMax.to(this.outerCursor, 0.2, {
          x: box.x,
          y: box.y,
          width: box.width,
          height: box.height,
          opacity: 0,
        });
      };

      // restore to default
      const handleMouseLeave = () => {
        this.isStuck = false;
        TweenMax.to(this.outerCursor, 0.2, {
          width: this.outerCursorOriginals.width,
          height: this.outerCursorOriginals.height,
          opacity: 0.3,
        });
      };

      // event listeners
      _document
        .on('mouseenter', '.js-circle-nav', handleMouseEnter)
        .on('mouseleave', '.js-circle-nav', handleMouseLeave);
    },

    initHoversMain: function() {
      const mainNavHoverTween = TweenMax.to(this.outerCursor, 0.3, {
        backgroundColor: '#F58823',
        ease: this.easing,
        paused: true,
      });

      const mainNavMouseEnter = () => {
        this.outerCursorSpeed = 0;
        TweenMax.set(this.innerCursor, { opacity: 0 });
        mainNavHoverTween.play();
      };

      const mainNavMouseLeave = () => {
        this.outerCursorSpeed = 0.2;
        TweenMax.set(this.innerCursor, { opacity: 1 });
        mainNavHoverTween.reverse();
      };

      _document
        .on('mouseenter', 'a:not(.js-circle-nav)', mainNavMouseEnter)
        .on('mouseleave', 'a:not(.js-circle-nav)', mainNavMouseLeave);
    },
  };
})(jQuery, window.APP);
