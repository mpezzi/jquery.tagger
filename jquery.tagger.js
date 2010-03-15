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

$.fn.tagger = function(arg1, arg2) {
  return this.each(function(){
    var self = $(this),
        tagger = $.fn.tagger,
        opts = $.extend({}, $.fn.tagger.defaults, ( typeof arg1 == 'object' ) ? arg1 : arg2);
    
    tagger.container = $('<ul class="tagger"></ul>').insertAfter(self);
    tagger.component = $.fn.tagger.component[self.context.nodeName.toLowerCase()];
    
    if ( !tagger.component.init(self, opts) )
      return false;
  
    if ( typeof arg1 == 'string' )
      tagger[arg1](arg2);
    
    self.disableTextSelect();
  });
};

$.extend($.fn.tagger, {
  defaults: {
    separator: ', ',
    active: 'selected'
  },
  create: function(tag) {
    var self = this;
    
    if ( typeof tag == 'object' ) {
      $.each(tag, function(i, t){
        return $('<li>').text(t).click(function(){
          self.component.has($(this)) ?
            self.component.remove($(this)) : self.component.add($(this));
          return false; // Disable event propagation.
        }).appendTo(self.container);
      });
    } else {
      return $('<li>').text(tag).click(function(){
        self.component.has($(this)) ?
          self.component.remove($(this)) : self.component.add($(this));
        return false; // Disable event propagation.
      }).appendTo(self.container);
    }
  },
  remove: function(tag) {
    $('li:contains('+ tag +')', this.container).remove();
  }
});

$.fn.tagger.component = [];

// Declare form type components.
$.fn.tagger.component.input = {
  init: function(element, opts) {
    var self = this;
    
    this.opts = opts;
    this.element = element;
    
    $.each(this.list(), function(i, t){
      tag = $.fn.tagger.create(t);
      tag.addClass(self.opts.active);
    });
    
    return this.element.has('[type="text"]');
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

$.fn.tagger.component.select = {
  init: function(element, opts) {
    this.opts = opts;
    this.element = element;
    
    return this.element.has('[multiple="multiple"]');
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
  if ( window.console && window.console.log )
    window.console.log(message);
}

})(jQuery);