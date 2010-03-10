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
    var self = $(this),
        opts = $.extend({}, $.fn.tagger.defaults, options),
        tagger = $.fn.tagger.component[self.context.type],
        container = $('<ul class="tagger"></ul>').insertAfter(self);
    
    tagger.element = self;
    tagger.init(opts);
    
    $.each(tagger.list(), function(i, t){
      $('<li>').text(t).css('cursor', 'pointer').click(function(){
        tagger.has($(this)) ?
          tagger.remove($(this)) : tagger.add($(this));
        
        // Cancel event propagations.
        return false;
      }).appendTo(container);
    });
    
    self.disableTextSelect();
  });
};

$.fn.tagger.defaults = {
  separator: ', ',
  active: 'selected'
};

$.fn.tagger.component = [];

// Declare form type components.
$.fn.tagger.component['text'] = {
  init: function(opts) {
    this.opts = opts;
  },
  has: function(tag) {
    var has = false;
    
    $.each(this.list(), function(i, t){
      if ( t == tag.text() )
        has = true;
    });
    
    return has;
  },
  add: function(tag) {
    this.element.val() ?
      this.element.val(this.element.val() + this.opts.separator + tag.text()) :
      this.element.val(tag.text());
    
    tag.addClass(this.opts.active);
  },
  remove: function(tag) {
    var self = this;
    
    $.each(self.list(), function(i, t){
      if ( t == tag.text() ) {
        list = self.list();
        list.splice(i, 1);
        self.element.val(list.join(self.opts.separator));
      }
    });
    
    tag.removeClass(this.opts.active);
  },
  list: function() {
    return this.element.val().split(this.opts.separator);
  }
};

$.fn.tagger.component['select-multiple'] = {
  init: function(opts) {
    
  },
  has: function(tag) {
    
  },
  add: function(tag) {
    
  },
  remove: function(tag) {
    
  },
  list: function() {
    
  }
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

})(jQuery);