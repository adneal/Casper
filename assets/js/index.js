/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        function casperFullImg() {
            $("img").each( function() {
                var contentWidth = $(".post-content").outerWidth(); // Width of the content
                var imageWidth = $(this)[0].naturalWidth; // Original image resolution

                if (imageWidth >= contentWidth) {
                    $(this).addClass('full-img');
                } else {
                    $(this).removeClass('full-img');
                }
            });
        };

        casperFullImg();
        $(window).smartresize(casperFullImg);

    });

}(jQuery));

// Fetch a new wallpaper from the Muzei database
(function($) {

    $(window).load(function() {
        // Get the cover and fade it in
        var cover = $('.blog-cover');
        cover.hide().fadeIn(2000);
        // Fetch the artwork
        $.ajax({
            url: 'http://muzeiapi.appspot.com/featured?cachebust=1',
            dataType: 'JSONP',
            jsonpCallback: 'callback',
            type: 'GET',
            // Show the new artwork
            success: function(data) {
                cover.css('background-image', 'url(' + data["imageUri"] + ')');
            },
            // Show the default artwork
            error: function(e) {
                cover.css('background-image', 'url(/assets/images/charlotte.gif)');
            }
        });

    });
} (jQuery));

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');