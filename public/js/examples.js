$(function() {
  var chapter = 'events';
  var mainEditorn;

  $('#main pre > code').each(function() {
    var code = $(this);
    var pre = code.parent();
    var example = $('<div>', {
      'class' : 'example'
    }).insertBefore(pre)[0];

    new CodeEditor(window, {
      content : $.trim(code.text()),
      target : example,
      onExecute : function() {
        mainEditor.setValue(this.getValue());
      }
    });

    pre.remove();
  });

  showExercise(chapter, 'sandbox');

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
        file : '/exercises/' + chapter + '/' + exercise + '.js'
      });
    };
  }

});
