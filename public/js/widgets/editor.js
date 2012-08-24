define([ 'jquery', 'widgets/_evented' ], function($, _evented) {
  var Editor = function(el) {
    var self = this;

    var destination = $('<div>', {
      'class' : 'editor'
    }).appendTo(el)[0];

    var editor = this.editor = CodeMirror(destination, {
      value : ' ',
      mode : 'javascript',
      lineNumbers : true,
      theme : 'default',
      readOnly : false
    });

    var buttonArea = $('<div>', {
      'class' : 'editor-buttons'
    }).prependTo(destination);

    $('<i>', {
      'class' : 'icon-play',
      'title' : 'Execute Code'
    })
    .appendTo(buttonArea)
    .click(function() { self.trigger('execute', editor.getValue()); });

    $('<i>', {
      'class' : 'icon-repeat',
      'title' : 'Reset to original'
    })
    .appendTo(buttonArea)
    .click(function() { self.trigger('reset'); });
  };

  Editor.prototype = $.extend({
    setValue : function(content) {
      this.editor.setValue(content);
    },

    getValue : function(content) {
      return this.editor.getValue(content);
    }
  }, _evented);

  return Editor;
});