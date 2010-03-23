/**
 * jQuery Tagger Plugin by M. Pezzi
 * http://thespiral.ca/jquery/tagger/demo/
 * Version: 1.0 (03/09/10)
 * Dual licensed under the MIT and GPL licences:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires: jQuery v1.3.2 or later
 */

;(function($){

var version = '1.0';

$.fn.tagger = function(arg1, arg2) {
  return this.each(function(){
    var element = $(this), opts = build_options(element, arg1, arg2), tagger = element.data('tagger') || {}, initialized = element.data('tagger.initialized') || false;
    
    // Initialize tagger.
    if ( !initialized ) {
      tagger.opts = opts;
      tagger.element = element;
      tagger.component = $.fn.tagger.component[element.context.nodeName.toLowerCase()];
      tagger.container = $('<ul class="tagger"></ul>').insertAfter(element).disableTextSelect();
      
      // Save tagger controller.
      element.data('tagger', tagger);
      
      // Initialize the component.
      tagger.component.init(tagger);
    } else if ( typeof $.fn.tagger[arg1] !== 'undefined' ) {
      $.fn.tagger[arg1](tagger, arg2);
    }
  });
};

$.extend($.fn.tagger, {
  component: [],
  defaults: {
    separator: ', ',
    selected: 'selected'
  },
  create: function(tagger, arg) {
    var self = this;
    return $('<li>').text(arg).click(function(){
      tagger.component.selected(this) ?
        self.unselect(this) : self.select(this);
    }).appendTo(tagger.container);
  },
  add: function(tagger, args) {
    var self = this;
    if ( typeof args == 'object' ) {
      $.each(args, function(i){
        self.create(tagger, i);
      });
    } else {
      return self.create(tagger, args);
    }
  },
  remove: function(arg) {
    
  },
  select: function(arg) {
    
  },
  unselect: function(arg) {
    
  }
});

// Declare form type components.
$.fn.tagger.component.input = {
  init: function(tagger) {
    this.opts = tagger.opts;
    this.element = tagger.element;
    
    list = this.list();
    for ( var i in list ) {
      tag = $.fn.tagger.create(tagger, list[i]);
      $(tag).addClass(this.opts.selected);
    }
  },
  selected: function(tag) {
    
  },
  select: function(tag) {
    
  },
  unselect: function(tag) {
    
  },
  list: function() {
    return this.element.val().split(this.opts.separator);
  }
};

$.fn.tagger.component.select = {
  init: function(tagger) {
    this.opts = tagger.opts;
    this.element = tagger.element;
    
    this.list().each(function(){
      $.fn.tagger.create(tagger, $(this).text());
    });
  },
  toggle: function() {
    
  },
  selected: function(tag) {
    
  },
  select: function(tag) {
    
  },
  unselect: function(tag) {
    
  },
  list: function() {
    return this.element.find('option');
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

// Build options and save them in the element data.
function build_options(element, arg1, arg2) {
  if ( typeof element.data('tagger.opts') !== 'undefined' ) {
    opts = element.data('tagger.opts');
    element.data('tagger.initialized', true);
  } else {
    opts = $.extend({}, $.fn.tagger.defaults, arg1);
    element.data('tagger.opts', opts);
    element.data('tagger.initialized', false);
  }
  
  return opts;
}

// Debugger.
function log(message) {
  if ( window.console && window.console.log )
    window.console.log(message);
}

})(jQuery);