/*
 * jQuery Tagger Plugin by M. Pezzi
 * http://thespiral.ca/jquery/tagger/demo/
 * Version: 1.0 (03/09/10)
 * Dual licensed under the MIT and GPL licences:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.3.2 or later
 */

;(function($){

$.fn.tagger = function(options) {
  return this.each(function(){
    var self = $(this), opts = $.extend({}, $.fn.tagger.defaults, options);
    
    self.disableTextSelect();
  });
};

$.fn.tagger.defaults = {
  
};

// Form Components.
$.fn.tagger.textfield = {

};

$.fn.tagger.select = {
  
};

// Disable text selection.
$.fn.disableTextSelect = function() {
  return this.each(function(){
    if ( $.browser.mozilla ) {
      $(this).css('MozUserSelect', 'none');
    } else if ( $.browser.msie ) {
      $(this).bind('selectstart', function(){ return false; });
    } else {
      $(this).mousedown(function(){ return false; });
    }
  });
};

// Debugger.
function log(message) {
  if ( window.console )
    window.console.log(message);
}

});