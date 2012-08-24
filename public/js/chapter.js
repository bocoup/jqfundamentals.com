define([
  'jquery',
  'widgets/editor',
  'widgets/example',
  'widgets/results'
], function($, Editor, Example, Results) {
  var chapter = $('#main').attr('data-chapter');
  var body = $('body').addClass('sandbox-visible');

  var editor = new Editor( $('#editor')[0] );
  var results = new Results( $('#results')[0] );

  editor.on('execute', function(code) {
    // TODO: execute code in results area
  });

  editor.on('reset', function() {
    // TODO: reset results area
  });

  $('#main pre > code').each(function(idx, el) {
    var example = new Example(el);
    example.on('explore', function(content) {
      // TODO: send contents to editor
    });
  });

  $('#editor-btn').click(function() {
    body.toggleClass('sandbox-visible');
    window.localStorage.setItem(
      'editorVisible',
      +body.hasClass('sandbox-visible')
    );
  });

});

/*
$(function() {
  var mainEditor;
  var body = $('body');
  var hasLocalStorage = 'localStorage' in window;

  function showSandbox(sandbox, opts) {
    var editor = $('#editor').empty();
    var results = $('#results').empty();
    var target = $('<div>', {
      'class' : 'editor'
    }).appendTo(editor)[0];

    var iframe = $('<iframe>', {
      src : sandbox,
      width : '275',
      height: '250',
      frameBorder : '0'
    }).appendTo(results);

    var win = iframe[0].contentWindow;

    win.onload = function() {
      mainEditor = new CodeEditor(win, {
        target : target,
        content : opts && opts.content,
        buttons : [ 'execute', 'reset' ],
        onReset : function() {
          showSandbox(sandbox);
        }
      });

    };
  }

});
 */
