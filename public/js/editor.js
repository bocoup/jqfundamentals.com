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
    if (opts.buttons === false) {
      return;
    }

    var buttonArea = $('<div>', {
      'class' : 'editor-buttons'
    }).prependTo(t);

    var buttons = {
      execute : function() {
        var executeAllButton = $('<i>', {
          'class' : 'icon-play',
          'title' : 'Execute Code'
        }).appendTo(buttonArea);
        executeAllButton.click(executeAll(editor));
      },

      reset : function() {
        var resetButton = $('<i>', {
          'class' : 'icon-repeat',
          'title' : 'Reset to original'
        }).appendTo(buttonArea);
        resetButton.click(function() {
          editor.setValue(opts.content);
        });
      },

      explore : function() {
        var exploreButton = $('<i>', {
          'class' : 'icon-eye-open',
          'title' : 'Try in editor'
        }).appendTo(buttonArea);
        exploreButton.click(explore(editor));
      }
    };

    $.each(opts.buttons, function(idx, btn) {
      if (buttons[btn]) {
        buttons[btn]();
      }
    });

  }

  function executeShortcut(editor) {
    executeAll(editor)();
  }

  function explore(editor) {
    if (!opts.onExplore) {
      console.warn('no onExplore specified for', editor);
      return $.noop;
    }

    return function() {
      opts.onExplore.call(editor);
    };
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
      theme : 'default',
      readOnly : opts.readOnly
    });
  }

};
