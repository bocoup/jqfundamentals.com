$(function() {
  var chapter = 'events';
  var mainEditor;
  var body = $('body');
  var editorBtn = $('#editor-btn');

  $('#main pre > code').each(createEditorForCodeBlock);
  showExercise(chapter, 'sandbox');
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
        mainEditor.setValue(this.getValue());
        body.removeClass('sandbox-hidden');
        editorBtn.text('Hide Editor');
      },
      readOnly : true
    });

    pre.remove();
  }

  function toggleEditor() {
    body.toggleClass('sandbox-hidden');
    if (body.hasClass('sandbox-hidden')) {
      editorBtn.text('Show Editor');
    } else {
      editorBtn.text('Hide Editor');
    }
  }

  function showExercise(chapter, exercise) {
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
        buttons : [ 'execute', 'reset' ]
      });
    };
  }

});
