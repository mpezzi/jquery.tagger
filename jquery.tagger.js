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

var version = '1.0';

$.fn.tagger = function(arg1, arg2) {
  return this.each(function(){
    var element = $(this),
        tagger = $.fn.tagger,
        opts = ( typeof element.data('tagger.opts') == 'undefined' ) ?
                  $.extend({}, $.fn.tagger.defaults, arg1) : element.data('tagger.opts');
    
    // Save options.
    element.data('tagger.opts', opts);
    
    // Determine tagger mode.
    if ( typeof arg1 == 'undefined' || typeof arg1 == 'object' ) {
      
      // Setup tagger.
      tagger.container = $('<ul class="tagger"></ul>').insertAfter(element);
      tagger.component = $.fn.tagger.component[element.context.nodeName.toLowerCase()];
      tagger.component.opts = opts;
      tagger.component.element = element;
      
      if ( !tagger.component.init() )
        return false;
      
      tagger.container.disableTextSelect();
    } else if ( typeof tagger[arg1] !== 'undefined' ) {
      tagger[arg1](arg2);
    }
    
  });
};

$.extend($.fn.tagger, {
  defaults: {
    separator: ', ',
    selected: 'selected'
  },
  create: function(args) {
    var self = this;
    
    if ( typeof args == 'object' ) {
      for ( var i in args ) {
        $('<li>').text(args[i]).click(function(){
          self.component.selected(this) ?
            self.unselect(this) : self.select(this);
        }).appendTo(this.container);
      }
    } else {
      return $('<li>').text(args).click(function(){
        self.component.selected(this) ?
          self.unselect(this) : self.select(this);
      }).appendTo(this.container);
    }
  },
  remove: function(arg) {
    
  },
  select: function(arg) {
    this.component.select(arg);
    $(arg).addClass(this.component.opts.selected);
  },
  unselect: function(arg) {
    this.component.unselect(arg);
    $(arg).removeClass(this.component.opts.selected);
  }
});

// Components.
$.fn.tagger.component = [];

// Declare form type components.
$.fn.tagger.component.input = {
  init: function() {
    list = this.list();
    for ( var i in list ) {
      tag = $.fn.tagger.create(list[i]);
      $(tag).addClass(this.opts.selected);
    }
    
    return this.element.has('[type="text"]');
  },
  toggle: function() {
    this.selected(this) ?
      this.unselect(this) : this.select(this);
  },
  selected: function(tag) {
    tags = this.list();
    for ( var i in tags ) {
      if ( tags[i] == $(tag).text() )
        return true;
    }
    
    return false;
  },
  select: function(tag) {
    text = $(tag).text();
    this.element.val() ?
      this.element.val(this.element.val() + this.opts.separator + text) :
      this.element.val(text);
  },
  unselect: function(tag) {
    var tag = $(tag).text(), tags = this.list();
    for ( var i in tags ) {
      if ( tags[i] == tag ) {
        tags.splice(i, 1);
        this.element.val(tags.join(this.opts.separator));
      }
    }
  },
  list: function() {
    return this.element.val().split(this.opts.separator);
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