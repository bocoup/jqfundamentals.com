$(function() {
  var win;

  $('#exercises select').on('change', function(e) {
    var exercise = $(this).val();
    var results = $('#results').empty();

    CodeEditor('/exercises/events/' + exercise + '.js', '#editor');

    var iframe = $('<iframe>', {
      src : '/exercises/events/' + exercise + '.html',
      width : '400',
      height: '400',
      frameBorder : '0'
    }).appendTo(results);

    win = iframe[0].contentWindow;
  });

  window.CodeEditor = function(file, target, opts) {
    var t = $(target);
    var dest = $('<div class="editor">').appendTo(t)[0];

    CodeMirror.keyMap['default']['Shift-Ctrl-;'] = executeShortcut;
    opts = opts || {};

    function setupEditor(editor) {
      if (!opts.noButtons) {
        var executeSelectionButton = $('<button class="btn">Execute Selection</button>').prependTo(t);
        executeSelectionButton.click(executeSelection(editor));

        var executeAllButton = $('<button class="btn">Execute</button>').prependTo(t);
        executeAllButton.click(executeAll(editor));
      }
    }

    function executeShortcut(editor) {
      executeAll(editor)();
    }

    function executeSelection(editor) {
      return function() {
        execute(editor.getSelection() || editor.getValue());
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
        theme : 'default'
      });
    }

    if (file) {
      $.ajax({
        url : file,
        dataType : 'text',
        success : function(f) {
          var editor = makeEditor(dest, f);
          setupEditor(editor);
        }
      });
    } else {
      makeEditor(dest, '');
    }
  };

});
