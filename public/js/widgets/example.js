define([
  'jquery',
  'widgets/_evented',
  'vendor/codemirror'
], function($, _evented, CodeMirror) {
  var Example = function(el) {
    var code = $(el);
    var pre = code.parent();
    var self = this;

    var container = $('<div>', {
      'class' : 'editor-container'
    }).insertBefore(pre)[0];

    var content = $.trim(code.text());
    var editorInfo = content.match(/^```(.+)\n/);

    if ( editorInfo ) {
      content = content.replace(/^.+\n/, '');
    }

    var mode = /^</.test(content) ?
                { name : 'xml', htmlMode : true } :
                'javascript';

    var editor = this.editor = new CodeMirror(container, {
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

    if ( editorInfo ) {
      $('<div>', {
        'class' : 'editor-info'
      })
      .prependTo( container )
      .html( editorInfo[1] );
    }

  };

  Example.prototype = $.extend({}, _evented);

  return Example;
});
