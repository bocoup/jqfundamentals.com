define([ 'jquery', 'widgets/_evented' ], function($, _evented) {
  var Example = function(el) {
    var code = $(el);
    var pre = code.parent();
    var self = this;

    var container = $('<div>', {
      'class' : 'editor-container'
    }).insertBefore(pre)[0];

    var content = $.trim(code.text());

    var mode = /^</.test(content) ?
                { name : 'xml', htmlMode : true } :
                'javascript';

    var editor = this.editor = CodeMirror(container, {
      value : content,
      mode : mode,
      lineNumbers : true,
      theme : 'default',
      readOnly : true
    });

    pre.remove();

    var buttonArea = $('<div>', {
      'class' : 'editor-buttons'
    }).prependTo(container);

    var exploreButton = $('<i>', {
      'class' : 'icon-eye-open',
      'title' : 'Try in editor'
    }).appendTo(buttonArea);

    exploreButton.click(function() {
      self.trigger('explore', editor.getValue());
    });
  };

  Example.prototype = _evented;

  return Example;
});
