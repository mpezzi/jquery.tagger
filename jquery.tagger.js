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
      tagger.component = $.fn.tagger.component[element.context.nodeName.toLowerCase()];
      tagger.container = $('<div class="tagger"></div>').insertAfter(element);
      tagger.toggle = $('<div class="toggle"></div>').text(opts.toggleText[0]).appendTo(tagger.container);
      tagger.toggleSelected = $('<div class="toggle-selected"></div>').text(opts.toggleSelectedText[0]).appendTo(tagger.container);
      tagger.tags = $('<ul class="clearfix"></ul>').appendTo(tagger.container).disableTextSelect();
      tagger.opts = opts;
      tagger.element = element;
      
      // Set up the toggles.
      tagger.toggle.click(function(){
        $.fn.tagger.toggle(tagger);
      });
      
      tagger.toggleSelected.click(function(){
        $.fn.tagger.toggleSelected(tagger);
      });
      
      // Save tagger controller.
      element.data('tagger', tagger);
      
      // Initialize the component.
      tagger.component.init(tagger);
    }
    
    // Method was passed, execute.
    else if ( typeof arg1 == 'string' && typeof $.fn.tagger[arg1] !== 'undefined' ) {
      $.fn.tagger[arg1](tagger, arg2);
    }
  });
};

$.extend($.fn.tagger, {
  component: [],
  defaults: {
    toggleText: ['Show', 'Hide'],
    toggleSelectedText: ['Show Unselected', 'Show Only Selected'],
    separator: ', ',
    selected: 'selected'
  },
  create: function(tagger, arg) {
    var self = this;
    return $('<li>').text(arg).click(function(){
      tagger.component.selected(tagger, this) ?
        self.unselect(tagger, this) : self.select(tagger, this);
    }).appendTo(tagger.tags);
  },
  add: function(tagger, args) {
    var self = this;
    if ( typeof args == 'object' ) {
      $.each(args, function(i, t){
        self.create(tagger, t);
      });
    } else {
      return self.create(tagger, args);
    }
  },
  remove: function(arg) {
    
  },
  select: function(tagger, arg) {
    tagger.component.select(tagger, arg);
    $(arg).addClass(tagger.opts.selected);
  },
  unselect: function(tagger, arg) {
    tagger.component.unselect(tagger, arg);
    $(arg).removeClass(tagger.opts.selected);
  },
  toggle: function(tagger) {

  },
  toggleSelected: function(tagger) {
    
  }
});

// Declare form type components.
$.fn.tagger.component.input = {
  init: function(tagger) {
    list = this.list(tagger);
    for ( var i in list ) {
      tag = $.fn.tagger.create(tagger, list[i]);
      $(tag).addClass(tagger.opts.selected);
    }
  },
  selected: function(tagger, tag) {
    tags = this.list(tagger);
    for ( var i in tags ) {
      if ( tags[i] == $(tag).text() )
        return true;
    }
    
    return false;
  },
  select: function(tagger, tag) {
    text = $(tag).text();
    tagger.element.val() ?
      tagger.element.val(tagger.element.val() + tagger.opts.separator + text) :
      tagger.element.val(text);
  },
  unselect: function(tagger, tag) {
    var tag = $(tag).text(), tags = this.list(tagger);
    for ( var i in tags ) {
      if ( tags[i] == tag ) {
        tags.splice(i, 1);
        tagger.element.val(tags.join(tagger.opts.separator));
      }
    }
  },
  list: function(tagger) {
    return tagger.element.val().split(tagger.opts.separator);
  }
};

$.fn.tagger.component.select = {
  init: function(tagger) {
    this.opts = tagger.opts;
    this.element = tagger.element;
    
    this.list(tagger).each(function(){
      tag = $.fn.tagger.create(tagger, $(this).text());
      if ( $(this).is(':selected') )
        tag.addClass(tagger.opts.selected);
    });
  },
  selected: function(tagger, tag) {
    var selected = false;
    this.list(tagger).each(function(){
      if ( $(this).text() == $(tag).text() && $(this).is(':selected') )
        selected = true;
    });
    
    return selected;
  },
  select: function(tagger, tag) {
    this.list(tagger).each(function(){
      if ( $(this).text() == $(tag).text() )
        $(this).attr('selected', 'selected');
    });
  },
  unselect: function(tagger, tag) {
    this.list(tagger).each(function(){
      if ( $(this).text() == $(tag).text() )
        $(this).removeAttr('selected');
    });
  },
  list: function(tagger) {
    return tagger.element.find('option');
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