jQuery(document).ready(function ($) {
  var animationDuration = 5000;

  function animateText($element) {
    var nextElement = getNextElement($element);

    $element.parents('.change-text-wrap').animate({ width: '2px' }, 600, function () {
      toggleVisibility($element, nextElement);
      $(this).animate({ width: nextElement.width() + 10 }, 600, function () {
        setTimeout(function () {
          animateText(nextElement);
        }, animationDuration);
      });
    });
  }

  function toggleVisibility($current, $next) {
    $current.removeClass('is-visible').addClass('is-hidden');
    $next.removeClass('is-hidden').addClass('is-visible');
  }

  function getNextElement($current) {
    return $current.is(':last-child') ? $current.parent().children().eq(0) : $current.next();
  }

  $('.change-text.clip .is-visible').each(function () {
    var $this = $(this);
    setTimeout(function () {
      animateText($this);
    }, animationDuration);
  });
});
