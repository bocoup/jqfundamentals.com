window.CodeEditor = function(targetWindow, opts) {
  var win = targetWindow || window;

  if (!opts.target) {
    throw 'No target defined for CodeEditor';
  }

  var t = $(opts.target)[0];
  var editor = makeEditor(t, '');
  setupButtons(editor);

  if (opts.file) {
    $.ajax({
      url : opts.file,
      dataType : 'text',
      success : function(f) {
        opts.content = f;
        editor.setValue(f);
      }
    });
  } else {
    editor.setValue(opts.content || '');
  }

  CodeMirror.keyMap['default']['Shift-Ctrl-;'] = executeShortcut;

  return editor;

  function setupButtons(editor) {
    if (opts.noButtons) {
      return;
    }

    var buttonArea = $('<div>', {
      'class' : 'editor-buttons'
    }).prependTo(t);

    var executeAllButton = $('<i>', {
      'class' : 'icon-play',
      'title' : 'Execute Code'
    }).appendTo(buttonArea);
    executeAllButton.click(executeAll(editor));

    var resetButton = $('<i>', {
      'class' : 'icon-repeat',
      'title' : 'Reset to original'
    }).appendTo(buttonArea);
    resetButton.click(function() {
      editor.setValue(opts.content);
    });
  }

  function executeShortcut(editor) {
    executeAll(editor)();
  }

  function executeAll(editor) {
    return function() {
      if (opts.onExecute) {
        opts.onExecute.call(editor);
        return;
      }

      execute(editor.getValue());
    };
  }

  function execute(val) {
    var fn = new win.Function(val);
    fn();
  }

  function makeEditor(dest, contents) {
    return CodeMirror(dest, {
      value : contents || ' ',
      mode : opts.mode || 'javascript',
      lineNumbers : true,
      theme : 'default'
    });
  }

};
