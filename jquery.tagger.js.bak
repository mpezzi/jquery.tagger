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
        opts = $.extend({}, $.fn.tagger.defaults, ( typeof arg1 == 'object' ) ? arg1 : self.data('tagger.opts'));
    
    self.data('tagger.opts', opts);
    
    tagger.container = $('<ul class="tagger"></ul>').insertAfter(self);
    tagger.component = $.fn.tagger.component[self.context.nodeName.toLowerCase()];
    tagger.component.opts = opts;
    tagger.component.element = self;
    
    if ( typeof arg1 == 'string' ) {
      tagger[arg1](arg2);
    } else {
      if ( !tagger.component.init() )
        return false;
      
      self.disableTextSelect();
    }
  });
};

$.extend($.fn.tagger, {
  defaults: {
    separator: ', ',
    active: 'selected'
  },
  create: function(tag) {
    var self = this;
    return $('<li>').text(tag).click(function(){
      self.component.selected(this) ?
        self.unselect(this) : self.select(this);
    }).appendTo(this.container);
  },
  remove: function(tag) {
    
  },
  select: function(tag) {
    this.component.select(tag);
    $(tag).addClass(this.component.opts.active);
  },
  unselect: function(tag) {
    this.component.unselect(tag);
    $(tag).removeClass(this.component.opts.active);
  }
});

$.fn.tagger.component = [];

// Declare form type components.
$.fn.tagger.component.input = {
  init: function() {
    list = this.list();
    for ( var i in list ) {
      tag = $.fn.tagger.create(list[i]);
      $(tag).addClass(this.opts.active);
    }
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

$.fn.tagger.component.xinput = {
  init: function(element, opts) {
    var self = this;
    
    this.opts = opts;
    this.element = element;
    
    $.each(this.list(), function(i, t){
      tag = $.fn.tagger.create(t);
      // tag.addClass(self.opts.active);
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