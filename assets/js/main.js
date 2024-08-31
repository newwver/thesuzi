(function () {
  'use strict';

  const myMain = {
    window: window,
    document: document,
    body: document.querySelector('body'),
    html: document.querySelector('html'),

    initialize: function () {
      this.setupGlobals();
      this.executeMethods();
    },

    setupGlobals: function () {
      this.window = window;
      this.document = document;
      this.body = document.querySelector('body');
      this.html = document.querySelector('html');
    },

    executeMethods: function () {
      this.activateFeatherIcons();
      this.initializeGoTop();
      this.enableStickyHeader();
      this.enableSmoothScroll();
      this.menuScroll();
      this.modalImageData();
      this.galleryActivation();
      this.mobileMenuActive();
      this.activateWOW();
      this.activateAOS();
      this.pageNavigation();
    },

    activateWOW: function () {
      if (typeof WOW !== 'undefined') {
        new WOW().init();
      }
    },

    enableSmoothScroll: function () {
      this.document.addEventListener(
        'click',
        function (event) {
          const target = event.target;
          if (target.classList.contains('smooth-animation')) {
            event.preventDefault();
            const targetElement = this.document.querySelector(target.getAttribute('href'));
            if (targetElement) {
              this.window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth',
              });
            }
          }
        }.bind(this),
      );
    },

    menuScroll: function () {
      const navLinks = document.querySelectorAll('.header-menu .nav-link');
      const dropdownMenus = document.querySelectorAll('.dropdown-menu');
      const languageDropdown = document.getElementById('languageDropdown');

      if (navLinks.length > 0) {
        navLinks.forEach((anchor) => {
          anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId.startsWith('#')) {
              e.preventDefault();
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                window.scrollTo({
                  top: targetElement.offsetTop,
                  behavior: 'smooth',
                });
              }
            }
          });
        });
      }

      window.addEventListener('scroll', function () {
        if (dropdownMenus.length > 0) {
          dropdownMenus.forEach((menu) => {
            if (menu.classList.contains('show')) {
              const dropdown = bootstrap.Dropdown.getInstance(languageDropdown);
              if (dropdown) {
                dropdown.hide();
              }
            }
          });
        }
      });
    },

    modalImageData: function () {
      const modal = document.querySelector('.modal');
      const modalImg = document.getElementById('modalImage');
      const imageContainers = document.querySelectorAll('.sec-portfolio');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const closeButton = document.querySelector('.close');

      if (modal && modalImg && imageContainers.length > 0 && prevBtn && nextBtn && closeButton) {
        let currentIndex = 0;
        let filteredImages = [];

        const showImage = (index) => {
          const targetImg = filteredImages[index].querySelector('img');
          modalImg.src = targetImg.src;
        };

        const filterImages = (target) => {
          filteredImages = Array.from(imageContainers).filter(
            (container) => container.getAttribute('data-bs-target') === target,
          );
        };

        imageContainers.forEach((container, index) => {
          container.addEventListener('click', function () {
            const targetModalId = container.getAttribute('data-bs-target');
            filterImages(targetModalId);
            currentIndex = filteredImages.indexOf(container);
            showImage(currentIndex);
            modal.setAttribute('id', targetModalId.replace('#', ''));

            modal.style.display = 'block';
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
          });
        });

        prevBtn.addEventListener('click', function () {
          currentIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
          showImage(currentIndex);
        });

        nextBtn.addEventListener('click', function () {
          currentIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
          showImage(currentIndex);
        });

        const closeModal = () => {
          modal.style.display = 'none';
          modal.classList.remove('show');
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        };

        closeButton.addEventListener('click', function () {
          closeModal();
        });

        window.addEventListener('click', function (event) {
          if (event.target === modal) {
            closeModal();
          }
        });

        $(modal).on('hidden.bs.modal', function () {
          closeModal();
        });
      }
    },

    activateFeatherIcons: function () {
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    },

    initializeGoTop: function () {
      const goTopButton = this.document.querySelector('.go-top > div');

      if (goTopButton) {
        this.window.addEventListener(
          'scroll',
          function () {
            const baseline = this.window.scrollY || this.window.pageYOffset;
            if (baseline > 100) {
              goTopButton.style.display = 'block';
              goTopButton.style.opacity = '1';
            } else {
              goTopButton.style.opacity = '0';
              goTopButton.style.display = 'none';
            }
          }.bind(this),
        );

        goTopButton.addEventListener(
          'click',
          function () {
            this.window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
            return false;
          }.bind(this),
        );
      }
    },

    enableStickyHeader: function () {
      const headerSticky = this.document.querySelector('.header--sticky');
      if (headerSticky) {
        this.window.addEventListener(
          'scroll',
          function () {
            headerSticky.classList.toggle('sticky', this.window.scrollY > 30);
          }.bind(this),
        );
      }
    },

    mobileMenuActive: function () {
      const _this = this;
      _this._html = $('html');

      $('.hamburger-menu').on('click', function (e) {
        e.preventDefault();
        $('.popup-mobile-menu').addClass('menu-open');
        _this._html.css({ overflow: 'hidden' });
      });

      const closeMenu = function () {
        $('.popup-mobile-menu').removeClass('menu-open');
        $('.popup-mobile-menu .has-droupdown > a')
          .removeClass('open')
          .siblings('.submenu')
          .removeClass('active')
          .slideUp('400');
        _this._html.css({ overflow: '' });
      };

      $('.close-menu-activation').on('click', function (e) {
        e.preventDefault();
        closeMenu();
      });

      $('.popup-mobile-menu .primary-menu .nav-link')
        .not('.has-droupdown > .nav-link')
        .on('click', function (e) {
          if ($(this).attr('href').startsWith('#')) {
            const targetId = $(this).attr('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth',
              });
            }
            closeMenu();
          } else {
            closeMenu();
          }
        });

      $('.popup-mobile-menu').on('click', function (e) {
        if (e.target === this) {
          closeMenu();
        }
      });

      $('.popup-mobile-menu .has-droupdown > a').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('open').siblings('.submenu').toggleClass('active').slideToggle('400');
      });

      $('.popup-mobile-menu .submenu a').on('click', function (e) {
        e.stopPropagation();
      });
    },

    galleryActivation: function () {
      if (typeof $ !== 'undefined' && $('.slide-wrap').length > 0) {
        $('.slide-wrap').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          adaptiveHeight: true,
          cssEase: 'linear',
          prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
          nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
        });
      }
    },

    activateAOS: function () {
      if (typeof AOS !== 'undefined') {
        AOS.init();
      }
    },

    pageNavigation: function () {
      if (typeof $ !== 'undefined' && $('.page-navigation').length > 0) {
        $('.page-navigation').onePageNav({
          currentClass: 'current',
          changeHash: true,
          scrollSpeed: 500,
          scrollThreshold: 0.2,
          filter: ':not(.external)',
          easing: 'swing',
          scrollChange: function ($currentListItem) {
            console.log(this);
          }.bind(this),
        });
      }
    },
  };

  myMain.initialize();
})();
