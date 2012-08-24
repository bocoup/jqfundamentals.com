define([ 'jquery', 'widgets/_evented' ], function($, _evented) {
  var Results = function(el, src) {
    this._createIframe(el, src);
  };

  Results.prototype = $.extend({
    _createIframe : function(el, src) {
      var self = this;
      this.ready = false;

      $(el).empty();

      var iframe = $('<iframe>', {
        src : src,
        width : 275,
        height : 255,
        frameBorder : 0
      }).appendTo(el);

      this.contentWindow = iframe[0].contentWindow;

      this.contentWindow.onload = function() {
        self._ready.call(self);
      }
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

    }
  }, _evented);

  return Results;
});