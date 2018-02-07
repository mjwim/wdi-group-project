angular
  .module('tripsApp')
  .directive('philCarousel', philCarousel);

philCarousel.$inject = [];
function philCarousel() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'js/views/directives/phil-carousel.html',
    scope: {
      slides: '='
    },
    link(scope, element) {
      scope.$watch('slides', () => {
        if (!scope.slides) return false;
        setTimeout(initCarousel);
      });

      function initCarousel(){

        var slides = element[0].querySelectorAll('.trip-item'),
          arrows = element[0].querySelectorAll('.lnr'),
          carouselCount = 0,
          scrollInterval,
          interval = 5000;

        arrows[0].addEventListener('click', function (e) {
          e = e || window.event;
          e.preventDefault();
          carouselCount -= 100;
          slider();
          if (e.type !== 'autoClick') {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(autoScroll, interval);
          }
        });
        arrows[1].addEventListener('click', sliderEvent);
        arrows[1].addEventListener('autoClick', sliderEvent);

        function sliderEvent(e) {
          e = e || window.event;
          e.preventDefault();
          carouselCount += 100;
          slider();
          if (e.type !== 'autoClick') {
            clearInterval(scrollInterval);
            scrollInterval = setInterval(autoScroll, interval);
          }
        }

        function slider() {
          switch (carouselCount) {
            case -100:
              carouselCount = 0;
              break;
            case 300:
              carouselCount = 0;
              break;
            default:
              break;
          }

          for (var i = 0; i < slides.length; i += 1) {
            slides[i].setAttribute('style', 'transform:translateX(-' + carouselCount + '%)');
          }
        }

        // create new Event to dispatch click for auto scroll
        var autoClick = new Event('autoClick');
        function autoScroll() {
          arrows[1].dispatchEvent(autoClick);
        }

        // set timing of dispatch click events
        scrollInterval = setInterval(autoScroll, interval);
      }

    }
  };
}
