(function ($) {

  $.fn.parallax_carousel = function (options) {

    var settings = $.extend({
      bgwidth: 1300,
      scrollsize: 30
    }, options);

    var config = {
      width: 0, //carousel width
      scrollsize: 0,
      slides: 0, //number of slides
      carousel: null
    };

    var setConfig = function (el) {
      config.width = el.width();
      config.slides = el.find('.slide').length;
      config.scrollsize = (settings.bgwidth - config.width) / config.slides;
      config.carousel = el;
    };

    var showSlide = function (slide) {
      slide.css('opacity', 0);
      slide.css('left', settings.scrollsize/2);
      slide.show();
      slide.animate({
        'opacity': 1,
        'left': '-=' + settings.scrollsize
      }, 2000, 'linear');
      config.carousel.animate({
        'background-position-x': '-=' + (config.scrollsize/2)
      }, 2000, 'linear');
    };
    
    var hideSlide = function (slide) {;
      slide.animate({
        'opacity': 0,
        'left': '-=' + settings.scrollsize
      }, 2000, 'linear', function() {
        slide.hide();
        showSlide(slide.next());
      });
      config.carousel.animate({
        'background-position-x': '-=' + (config.scrollsize/2)
      }, 2000, 'linear'); 
    };

    setConfig(this);

    this.find('.slide').hide();
    var first = this.find('.slide').first();
    showSlide(first);
    setTimeout(function() {
      hideSlide(first);
    }, 2000);
  };

  $(document).ready(function () {
    $('.pcarousel').parallax_carousel();
  });

}(jQuery));
