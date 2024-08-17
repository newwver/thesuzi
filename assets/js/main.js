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
      this.blogActivation();
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
      if (navLinks.length > 0) {
        navLinks.forEach((anchor) => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth',
              });
            }
          });
        });
      }
    },

    modalImageData: function () {
      const modal = document.querySelector('.modal');
      const modalImg = document.getElementById('modalImage');
      const imageContainers = document.querySelectorAll('.sec-portfolio');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');

      if (modal && modalImg && imageContainers.length > 0 && prevBtn && nextBtn) {
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
            $(modal).modal('show');
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
      const headerSticky = this.document.querySelector('#mainPage .header--sticky');
      if (headerSticky) {
        this.window.addEventListener(
          'scroll',
          function () {
            headerSticky.classList.toggle('sticky', this.window.scrollY > 30);
          }.bind(this),
        );
      }
    },

    blogActivation: function () {
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
