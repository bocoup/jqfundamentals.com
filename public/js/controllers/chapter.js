define([
  'jquery',
  'widgets/editor',
  'widgets/example',
  'widgets/results',

  'bootstrap'
], function($, Editor, Example, Results) {
  return function() {

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
      _gaq.push([ '_trackEvent', 'code', 'execute' ]);
    });

    editor.on('reset', function() {
      results.reset();
      _gaq.push([ '_trackEvent', 'editor', 'reset' ])
    });

    $('#main pre > code').each(function(idx, el) {
      var example = new Example(el);

      example.on('explore', function(content) {
        editor.setValue(content);
        body.addClass(cls);
        editorBtn.html('Hide Editor');
        _gaq.push([ '_trackEvent', 'code', 'explore' ])
      });
    });

    editorBtn.click(function() {
      body.toggleClass(cls);

      var visible = body.hasClass(cls);

      editorBtn.html( visible ? 'Hide Editor' : 'Show Editor' );
      _gaq.push([ '_trackEvent', 'editor', visible ? 'show' : 'hide' ]);
    });
  };
});