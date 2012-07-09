window.CodeEditor = function(targetWindow, opts) {
  var win = targetWindow || window;

  if (!opts.target) {
    throw 'No target defined for CodeEditor';
  }

  var t = $(opts.target)[0];
  var editor;

  if (opts.file) {
    $.ajax({
      url : opts.file,
      dataType : 'text',
      success : function(f) {
        opts.content = f;
        editor = makeEditor(t, f);
        setupButtons(editor);
      }
    });
  } else {
    editor = makeEditor(t, opts.content || '');
    setupButtons(editor);
  }

  CodeMirror.keyMap['default']['Shift-Ctrl-;'] = executeShortcut;

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
    console.log('executing shortcut', editor);
    executeAll(editor)();
  }

  function executeAll(editor) {
    return function() {
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
