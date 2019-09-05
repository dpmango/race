//////////
// HEADER
//////////
(function($, APP) {
  APP.Components.Header = {
    data: {
      header: {
        container: undefined,
        bottomPoint: undefined,
        headerNav: undefined,
      },
    },
    init: function(fromPjax) {
      if (!fromPjax) {
        this.getHeaderParams();
        this.hamburgerClickListener();
        this.mobileNaviClickListener();
        this.listenScroll();
        this.listenResize();
      }

      this.setMenuClass();
      this.controlHeaderClass();
    },
    getHeaderParams: function() {
      var $header = $('.header');
      var headerOffsetTop = 0;
      var headerHeight = $header.outerHeight() + headerOffsetTop;

      this.data.header = {
        container: $header,
        bottomPoint: headerHeight,
        headerNav: $('.header-nav'),
      };
    },
    closeMobileMenu: function(isOnload) {
      $('[js-hamburger]').removeClass('is-active');
      $('.header').removeClass('is-menu-active');
      $('.mobile-navi').removeClass('is-active');

      APP.Plugins.ScrollBlock.blockScroll(isOnload);
    },
    hamburgerClickListener: function() {
      _document.on('click', '[js-hamburger]', function() {
        $(this).toggleClass('is-active');
        $('.header').toggleClass('is-menu-active');
        $('.mobile-navi').toggleClass('is-active');

        APP.Plugins.ScrollBlock.blockScroll();
      });
    },
    mobileNaviClickListener: function() {
      var _this = this;

      _document
        .on('click', '[js-mobile-navi-menu] .mobile-navi__menu-title', function() {
          if (window.innerWidth <= 1024) {
            var $title = $(this);
            var $menuContainer = $title.closest('.mobile-navi__menu');
            var $siblingMenus = $menuContainer.siblings();

            // toggle classes
            $siblingMenus.find('.mobile-navi__menu-title').removeClass('is-active');
            $title.toggleClass('is-active');

            $siblingMenus.find('ul').slideUp();
            $menuContainer.find('ul').slideToggle();
          }
        })
        .on('click touchstart', function(e) {
          // close on outside clicks
          if (window.innerWidth <= 1024) {
            var $target = $(e.target);
            var $noclosestHeader = $target.closest('.header').length === 0;
            var $noclosestNaviWrapper = $target.closest('.mobile-navi__wrapper').length === 0;
            var closingCondition = $noclosestHeader && $noclosestNaviWrapper;
            if (closingCondition) {
              _this.closeMobileMenu();
            }
          }
        })
        .on('click', '[js-open-mobile-navi-panel]', function(e) {
          e.preventDefault();
          e.stopPropagation();

          var dataPanel = $(this).data('panel');

          $(this)
            .closest('.mobile-navi')
            .attr('data-active-panel', dataPanel);
        })
        .on('click', '[js-close-mobile-navi-panel]', function() {
          if (window.innerWidth <= 1024) {
            $(this)
              .closest('.mobile-navi')
              .removeAttr('data-active-panel');
          }
        })
        .on('click', '[js-open-header-panel]', function(e) {
          e.preventDefault();
          e.stopPropagation();

          var dataPanel = $(this).data('panel');

          $('[data-header-panel="' + dataPanel + '"]').addClass('is-active');
          APP.Plugins.ScrollBlock.disableScroll();
        })
        .on('click', '[js-close-header-panel]', function(e) {
          e.preventDefault();
          e.stopPropagation();

          $(this)
            .closest('.header-panel')
            .removeClass('is-active');

          APP.Plugins.ScrollBlock.enableScroll();
        });
    },
    listenScroll: function() {
      _window.on('scroll', this.scrollHeader.bind(this));
    },
    listenResize: function() {
      _window.on('resize', debounce(this.getHeaderParams.bind(this), 100));
    },
    scrollHeader: function() {
      if (this.data.header.container !== undefined) {
        var fixedClass = 'is-fixed';

        // get scroll params from blocker function
        var scroll = APP.Plugins.ScrollBlock.getData();

        if (scroll.blocked) return;

        if (scroll.y > 0) {
          this.data.header.container.addClass(fixedClass);
        } else {
          this.data.header.container.removeClass(fixedClass);
        }
      }
    },
    setMenuClass: function() {
      // SET ACTIVE CLASS IN HEADER
      var headerMenuList = $('.header__menu li');
      if (headerMenuList.length === 0) return;

      headerMenuList.each(function(i, val) {
        if (
          $(val)
            .find('a')
            .attr('href') === window.location.pathname.split('/').pop()
        ) {
          $(val).addClass('is-active');
        } else {
          $(val).removeClass('is-active');
        }
      });
    },
    controlHeaderClass: function() {
      this.data.header.container.attr('data-modifier', false);
      this.data.header.headerNav.attr('data-modifier', false);

      var $modifierElement = $('.page')
        .last()
        .find('[js-header-class]');

      if ($modifierElement.length > 0) {
        this.data.header.container.attr('data-modifier', $modifierElement.data('class'));
        this.data.header.headerNav.attr('data-modifier', $modifierElement.data('class'));
      }
    },
  };
})(jQuery, window.APP);
