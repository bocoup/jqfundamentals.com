$(function() {
  var exercise = $('#main').attr('data-exercise');

  var iframe = $('<iframe>', {
    src : '/exercises/' + exercise + '/index.html',
    width : '940',
    height : '400',
    frameBorder : 0
  }).appendTo('#exercise-html')[0];

  iframe.onload = function() {
    var win = iframe.contentWindow;

    var editor = $('<div>', {
      'class' : 'editor'
    }).appendTo('#editor')[0];

    new CodeEditor(win, {
      target : editor,
      content : '',
      buttons : [ 'execute', 'reset' ],
      onReset : function(editor) {
        editor.setValue('');
      }
    });
  };
});
