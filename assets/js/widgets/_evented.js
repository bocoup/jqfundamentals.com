define([ 'jquery' ], function($) {
  return {
    on : function(evt, fn) {
      this._listeners = this._listeners || {};
      this._listeners[evt] = this._listeners[evt] || [];
      this._listeners[evt].push(fn);
    },

    trigger : function(evt, data) {
      if (
        this._listeners &&
        this._listeners[evt] &&
        this._listeners[evt].length
      ) {
        $.each(this._listeners[evt], function(idx, fn) {
          fn(data);
        });
      }
    }
  };
});