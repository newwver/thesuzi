(function () {
  'use strict';

  const myMain = {
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
      this.initializeModal();
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
        (event) => {
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
        }
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

    initializeModal: function () {
      const modals = document.querySelectorAll('.modal');
      const modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"]');
      
      modalTriggers.forEach((trigger) => {
        const targetModalId = trigger.getAttribute('data-bs-target');
        const modalElement = document.querySelector(targetModalId);

        if (modalElement) {
          trigger.addEventListener('click', () => {
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
            if (modalInstance) {
              modalInstance.show();
            }
          });
        }
      });

      modals.forEach((modal) => {
        const closeButton = modal.querySelector('.close');
        const modalImg = modal.querySelector('#modalImage');
        const imageContainers = document.querySelectorAll(`[data-bs-target="#${modal.id}"]`);
        let currentIndex = 0;
        
        if (imageContainers.length > 0 && modalImg) {
          imageContainers.forEach((container, index) => {
            const img = container.querySelector('img');
            if (img) {
              img.addEventListener('click', () => {
                currentIndex = index;
                modalImg.src = img.getAttribute('data-src');
              });
            }
          });

          modal.querySelector('#prevBtn').addEventListener('click', () => {
            currentIndex = (currentIndex === 0 ? imageContainers.length : currentIndex) - 1;
            const img = imageContainers[currentIndex].querySelector('img');
            if (img) modalImg.src = img.getAttribute('data-src');
          });

          modal.querySelector('#nextBtn').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % imageContainers.length;
            const img = imageContainers[currentIndex].querySelector('img');
            if (img) modalImg.src = img.getAttribute('data-src');
          });
        }

        if (closeButton) {
          closeButton.addEventListener('click', () => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
              modalInstance.hide();
            }
          });
        }
      });
    },

    activateFeatherIcons: function () {
      if (typeof feather !== 'undefined') {
        feather.replace();
      }
    },

    initializeGoTop: function () {
      const goTopButton = this.document.querySelector('.go-top > div');

      if (goTopButton) {
        this.window.addEventListener('scroll', () => {
          const baseline = this.window.scrollY || this.window.pageYOffset;
          if (baseline > 100) {
            goTopButton.style.display = 'block';
            goTopButton.style.opacity = '1';
          } else {
            goTopButton.style.opacity = '0';
            goTopButton.style.display = 'none';
          }
        });

        goTopButton.addEventListener('click', () => {
          this.window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        });
      }
    },

    enableStickyHeader: function () {
      const headerSticky = this.document.querySelector('.header--sticky');
      if (headerSticky) {
        this.window.addEventListener('scroll', () => {
          headerSticky.classList.toggle('sticky', this.window.scrollY > 30);
        });
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
        _this._html.css({ overflow: '' });
      };

      $('.close-menu-activation').on('click', function (e) {
        e.preventDefault();
        closeMenu();
      });

      $('.popup-mobile-menu').on('click', function (e) {
        if (e.target === this) {
          closeMenu();
        }
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
        });
      }
    },
  };

  myMain.initialize();
})();
