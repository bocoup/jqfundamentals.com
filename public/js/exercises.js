$(function() {
  var chapter = $('#exercises').attr('data-chapter');

  $('#exercises select').on('change', function(e) {
    showExercise(chapter, $(this).val());
  });

  function showExercise(chapter, exercise) {
    var editor = $('#editor').empty();
    var results = $('#results').empty();
    var target = $('<div>', {
      'class' : 'editor'
    }).appendTo(editor)[0];

    var iframe = $('<iframe>', {
      src : '/exercises/' + chapter + '/' + exercise + '.html',
      width : '400',
      height: '400',
      frameBorder : '0'
    }).appendTo(results);

    new CodeEditor(iframe[0].contentWindow, {
      target : target,
      file : '/exercises/' + chapter + '/' + exercise + '.js'
    });
  }

});
