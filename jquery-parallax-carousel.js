(function ($) {

  $.fn.parallax_carousel = function (options) {

    var settings = $.extend({
      bgwidth: 1267,
      scrollsize: 30,
      timeout: 3000
    }, options);

    var timers = [];

    var config = {
      width: 0, //carousel width
      scrollsize: 0,
      slides: 0, //number of slides
      carousel: null,
      first: null
    };

    var setConfig = function (el) {
      config.width = el.width();
      config.slides = el.find('.slide').length;
      config.scrollsize = (settings.bgwidth - config.width) / config.slides;
      config.carousel = el;
    };

    var showSlide = function (slide) {
      slide.css('opacity', 0);
      slide.css('left', settings.scrollsize / 2);
      slide.show();
      setActivePager(slide.attr('id'));
      slide.animate({
        'opacity': 1,
        'left': '-=' + settings.scrollsize
      }, 1000, 'linear');
      if (slide.attr('id') === config.first.attr('id')) {
        config.carousel.animate({
          'background-position-x': 0
        }, 500, 'swing', function () {
          config.carousel.animate({
            'background-position-x': '-=' + (config.scrollsize / 2)
          }, 500, 'linear');
        });
      } else {
        config.carousel.animate({
          'background-position-x': '-=' + (config.scrollsize / 2)
        }, 1000, 'linear');
      }
      setHideSlide(slide);
    };

    var hideSlide = function (slide, next) {
      slide.animate({
        'opacity': 0,
        'left': '-=' + settings.scrollsize
      }, 1000, 'linear', function () {
        slide.hide();
      });
      var n = null;
      if (next === undefined) {
        if (slide.is(':last-child')) {
          n = config.first;
        } else {
          n = slide.next();
        }
      } else {
        n = next;
      }
      showSlide(n);
    };

    var setHideSlide = function (current) {
      clearTimers();
      timers.push(
          setTimeout(function () {
            hideSlide(current);
          }, settings.timeout));
    };

    var clearTimers = function () {
      for (var i in timers) {
        clearTimeout(timers[i]);
      }
    };

    var initPager = function () {
      $(config.carousel).append('<div class="pcarousel-overlay"></div><div class="pcarousel-pager"></div>');
      var pager = $(config.carousel).find('.pcarousel-pager');
      $(config.carousel).find('.slide').each(function () {
        var id = $(this).attr('id');
        pager.append('<div class="pcarousel-pager-item" data-slide="' + id + '"></div>');
      });
      $('.pcarousel-pager-item').click(function () {
        var id = $(this).attr('data-slide');
        var active = $('#' + $('.pcarousel-pager-item.active').attr('data-slide'));
        hideSlide(active, $('#' + id));
      });
    };

    var setActivePager = function (active_id) {
      $('.pcarousel-pager-item').removeClass('active');
      $('.pcarousel-pager').find('[data-slide="' + active_id + '"]').addClass('active');
    };

    var init = function (el) {
      setConfig(el);
      el.find('.slide').hide();
      var first = el.find('.slide').first();
      config.first = first;
      initPager();
      showSlide(first);
      setHideSlide(first);
    };

    init(this);
  };

  $(document).ready(function () {
    $('.pcarousel').parallax_carousel();
  });

}(jQuery));
