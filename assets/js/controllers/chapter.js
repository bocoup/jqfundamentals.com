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
    var editor, results;

    var editorEnabled = $(window).width() > 600;

    // set up code examples
    $('#main pre > code').each(function(idx, el) {
      var example = new Example(el, {
        editorEnabled : editorEnabled,
        onExplore : editorEnabled ? function(content) {
          editor.setValue(content);
          body.addClass(cls);
          editorBtn.html('Hide Editor');
          _gaq.push([ '_trackEvent', 'code', 'explore' ]);
        } : $.noop
      });
    });

    if ( editorEnabled ) {

      editor = new Editor( $('#editor')[0] );
      results = new Results( $('#results')[0], chapter );

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
        _gaq.push([ '_trackEvent', 'editor', 'reset' ]);
      });

      editorBtn.click(function() {
        body.toggleClass(cls);

        var visible = body.hasClass(cls);

        editorBtn.html( visible ? 'Hide Editor' : 'Show Editor' );
        _gaq.push([ '_trackEvent', 'editor', visible ? 'show' : 'hide' ]);
      });

    } else {

      editorBtn.remove();

    }


  };
});