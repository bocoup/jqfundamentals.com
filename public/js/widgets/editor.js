define([ 'jquery', 'widgets/_evented' ], function($, _evented) {
  var Editor = function(el) {
    var self = this;

    var destination = $('<div>', {
      'class' : 'editor'
    }).appendTo(el)[0];

    var editor = CodeMirror(destination, {
      value : ' ',
      mode : 'javascript',
      lineNumbers : true,
      theme : 'default',
      readOnly : false
    });

    var buttonArea = $('<div>', {
      'class' : 'editor-buttons'
    }).prependTo(destination);

    var executeAllButton = $('<i>', {
      'class' : 'icon-play',
      'title' : 'Execute Code'
    }).appendTo(buttonArea);

    executeAllButton.click(function() {
      self.trigger('execute', editor.getValue());
    });

    var resetButton = $('<i>', {
      'class' : 'icon-repeat',
      'title' : 'Reset to original'
    }).appendTo(buttonArea);

    resetButton.click(function() {
      self.trigger('reset');
    });
  };

  Editor.prototype = _evented;

  return Editor;
});