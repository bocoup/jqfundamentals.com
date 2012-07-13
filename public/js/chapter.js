$(function() {
  var mainEditor;
  var body = $('body');
  var editorBtn = $('#editor-btn');
  var currentExercise;
  var hasLocalStorage = 'localStorage' in window;

  $('#main pre > code').each(createEditorForCodeBlock);
  showExercise('sandbox', 'sandbox');
  editorBtn.on('click', function() {
    toggleEditor();
  });

  function createEditorForCodeBlock() {
    var code = $(this);
    var pre = code.parent();
    var example = $('<div>', {
      'class' : 'example'
    }).insertBefore(pre)[0];

    new CodeEditor(window, {
      content : $.trim(code.text()),
      target : example,
      buttons : [ 'explore' ],
      onExplore : function() {
        var source = this.getValue();
        showExercise('sandbox', 'sandbox').then(function(mainEditor) {
          console.log('setting to', source);
          mainEditor.setValue(source);
          body.removeClass('sandbox-hidden');
          editorBtn.text('Hide Editor');
          storeEditorState(true);
        });
      },
      readOnly : true
    });

    pre.remove();
  }

  function toggleEditor() {
    body.toggleClass('sandbox-hidden');
    if (body.hasClass('sandbox-hidden')) {
      storeEditorState(false);
      editorBtn.text('Show Editor');
    } else {
      storeEditorState(true);
      editorBtn.text('Hide Editor');
    }
  }

  function storeEditorState(state) {
    if (hasLocalStorage) {
      window.localStorage.setItem('editorVisible', +state);
    }
  }

  function showExercise(chapter, exercise) {
    currentExercise = exercise;

    var dfd = $.Deferred();
    var editor = $('#editor').empty();
    var results = $('#results').empty();
    var target = $('<div>', {
      'class' : 'editor'
    }).appendTo(editor)[0];

    var iframe = $('<iframe>', {
      src : '/exercises/' + chapter + '/' + exercise + '.html',
      width : '250',
      height: '250',
      frameBorder : '0'
    }).appendTo(results);

    var win = iframe[0].contentWindow;

    win.onload = function() {
      mainEditor = new CodeEditor(win, {
        target : target,
        file : '/exercises/' + chapter + '/' + exercise + '.js',
        buttons : [ 'execute', 'reset' ],
        onLoad : function() {
          dfd.resolve(mainEditor);
        },
        onReset : function() {
          showExercise(chapter, currentExercise);
        }
      });


      if (!hasLocalStorage) { return; }

      var editorVisible = +(window.localStorage.getItem('editorVisible'));
      if (editorVisible !== null && !editorVisible) {
        toggleEditor();
      }
    };

    return dfd.promise();
  }

});
