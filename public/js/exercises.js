$(function() {
  var win;

  $('#exercises select').on('change', function(e) {
    var editor = $('#editor').empty();
    var exercise = $(this).val();
    var results = $('#results').empty();
    var target = $('<div>', {
      'class' : 'editor'
    }).appendTo(editor)[0];

    var iframe = $('<iframe>', {
      src : '/exercises/events/' + exercise + '.html',
      width : '400',
      height: '400',
      frameBorder : '0'
    }).appendTo(results);

    new CodeEditor(iframe[0].contentWindow, {
      target : target,
      file : '/exercises/events/' + exercise + '.js'
    });
  });

});
