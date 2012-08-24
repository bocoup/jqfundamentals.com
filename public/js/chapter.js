require([
  'jquery',
  'widgets/editor',
  'widgets/example',
  'widgets/results'
], function($, Editor, Example, Results) {

  var cls = 'sandbox-visible';

  var chapter = $('#main').attr('data-chapter');
  var body = $('body');
  var editorBtn = $('#editor-btn');

  var editor = new Editor( $('#editor')[0] );
  var results = new Results( $('#results')[0], chapter );
  $('#sandbox').on('scroll', function(e) {
    e.preventDefault();
    e.stopPropagation();
  });

  editor.on('execute', function(code) {
    results.executeCode(code);
  });

  editor.on('reset', function() {
    results.reset();
  });

  $('#main pre > code').each(function(idx, el) {
    var example = new Example(el);
    example.on('explore', function(content) {
      editor.setValue(content);
      body.addClass(cls);
      editorBtn.html('Hide Editor');
    });
  });

  editorBtn.click(function() {
    body.toggleClass(cls);
    editorBtn.html( body.hasClass(cls) ? 'Hide Editor' : 'Show Editor' );
  });

});