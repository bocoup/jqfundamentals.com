define([
  'jquery',
  'widgets/editor',
  'widgets/example',
  'widgets/sandbox'
], function($, Editor, Example, Sandbox) {

  $('#main pre > code').each(function(idx, el) {
    new Example(el);
  });

});

/*
$(function() {
  var mainEditor;
  var body = $('body');
  var editorBtn = $('#editor-btn');
  var hasLocalStorage = 'localStorage' in window;
  var sandbox = $('#main').attr('data-sandbox');

  $('#main pre > code').each(createEditorForCodeBlock);

  showSandbox(sandbox);

  editorBtn.on('click', function() {
    toggleEditor();
  });

  function createEditorForCodeBlock() {
    var code = $(this);
    var pre = code.parent();

    var container = $('<div>', {
      'class' : 'editor-container'
    }).insertBefore(pre)[0];

    var content = $.trim(code.text());
    var mode = /^</.test(content) ?
      { name : 'xml', htmlMode : true } :
      'javascript';

    new CodeEditor(window, {
      content : content,
      mode : mode,
      target : container,
      buttons : mode === 'javascript' ? [ 'explore' ] : [],
      onExplore : mode === 'javascript' ? function() {
        var source = this.getValue();
        showSandbox(sandbox, { content : source });
        body.addClass('sandbox-visible');
        editorBtn.text('Hide Editor');
        storeEditorState(true);
      } : $.noop,
      readOnly : true
    });

    pre.remove();
  }

  function toggleEditor() {
    body.toggleClass('sandbox-visible');
    if (body.hasClass('sandbox-visible')) {
      storeEditorState(true);
      editorBtn.text('Hide Editor');
    } else {
      storeEditorState(false);
      editorBtn.text('Show Editor');
    }
  }

  function storeEditorState(state) {
    if (hasLocalStorage) {
      window.localStorage.setItem('editorVisible', +state);
    }
  }

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

  if (!hasLocalStorage) { return; }

  var editorVisible = +(window.localStorage.getItem('editorVisible'));

  if (editorVisible !== null && editorVisible) {
    toggleEditor();
  }
});
 */
