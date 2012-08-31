define([ 'jquery', 'widgets/_evented' ], function($, _evented) {
  var Results = function(el, src) {
    this.el = el;
    this.src = src;

    this._createIframe();
  };

  Results.prototype = $.extend({
    _createIframe : function() {
      var self = this;
      this.ready = false;

      $(this.el).empty();

      var iframe = $('<iframe>', {
        src : this.src,
        width : 275,
        height : 255,
        frameBorder : 0
      }).appendTo(this.el);

      this.contentWindow = iframe[0].contentWindow;

      this.contentWindow.onload = function() {
        self._ready.call(self);
      };
    },

    _ready : function() {
      this.ready = true;
    },

    executeCode : function(code) {
      if (!this.ready) {
        setTimeout(this.executeCode, 200);
        return;
      }

      (new this.contentWindow.Function(code))();
    },

    reset : function() {
      this._createIframe();
    }
  }, _evented);

  return Results;
});