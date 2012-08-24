define([
  'jquery',
  'widgets/editor',
  'widgets/example',
  'widgets/results'
], function($, Editor, Example, Results) {

  var chapter = $('#main').attr('data-chapter');
  var body = $('body').addClass('sandbox-visible');

  var editor = new Editor( $('#editor')[0] );
  var results = new Results( $('#results')[0], chapter );

  editor.on('execute', function(code) {
    results.executeCode(code);
  });

  editor.on('reset', function() {
    // TODO: reset results area
  });

  $('#main pre > code').each(function(idx, el) {
    var example = new Example(el);
    example.on('explore', function(content) {
      editor.setValue(content);
    });
  });

  $('#editor-btn').click(function() {
    body.toggleClass('sandbox-visible');

    window.localStorage.setItem(
      'editorVisible',
      +body.hasClass('sandbox-visible')
    );
  });

});