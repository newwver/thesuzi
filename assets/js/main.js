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
      new WOW().init();
    },

    enableSmoothScroll: function () {
      this.document.addEventListener(
        'click',
        function (event) {
          const target = event.target;
          if (target.classList.contains('smooth-animation')) {
            event.preventDefault();
            const targetElement = this.document.querySelector(target.getAttribute('href'));
            this.window.scrollTo({
              top: targetElement.offsetTop - 50,
              behavior: 'smooth',
            });
          }
        }.bind(this),
      );
    },

    menuScroll: function () {
      document.querySelectorAll('.header-menu .nav-link').forEach((anchor) => {
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
    },

    modalImageData: function () {
      const modalImg = document.getElementById('modalImage');
      const imageContainers = document.querySelectorAll('.sec-portfolio');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      let currentIndex = 0;

      // 모달에 이미지를 설정하는 함수
      const showImage = (index) => {
        const targetImg = imageContainers[index].querySelector('img');
        modalImg.src = targetImg.src;
      };

      // 이미지 컨테이너에 클릭 이벤트 추가
      imageContainers.forEach((container, index) => {
        container.addEventListener('click', function () {
          currentIndex = index; // 현재 이미지를 가리키는 인덱스 설정
          showImage(currentIndex); // 클릭된 이미지로 모달 이미지 설정
        });
      });

      // 이전 이미지로 이동
      prevBtn.addEventListener('click', function () {
        currentIndex = currentIndex === 0 ? imageContainers.length - 1 : currentIndex - 1;
        showImage(currentIndex);
      });
      // 다음 이미지로 이동
      nextBtn.addEventListener('click', function () {
        currentIndex = currentIndex === imageContainers.length - 1 ? 0 : currentIndex + 1;
        showImage(currentIndex);
      });
    },

    activateFeatherIcons: function () {
      feather.replace();
    },

    initializeGoTop: function () {
      const goTopButton = this.document.querySelector('.go-top > div');

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
    },

    enableStickyHeader: function () {
      this.window.addEventListener(
        'scroll',
        function () {
          const headerSticky = this.document.querySelector('.header--sticky');
          headerSticky.classList.toggle('sticky', this.window.scrollY > 30);
        }.bind(this),
      );
    },

    blogActivation: function () {
      $('.blog-activation').slick({
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
    },

    activateAOS: function () {
      AOS.init();
    },

    pageNavigation: function () {
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
    },
  };

  myMain.initialize();
})();
