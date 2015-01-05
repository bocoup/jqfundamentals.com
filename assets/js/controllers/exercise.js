define([
  'jquery',
  'widgets/editor',
  'widgets/results',

  'bootstrap'
], function($, Editor, Results) {
  var exercise = $('#main').attr('data-exercise');
  return function() {
    var editor = new Editor( '#editor' );
    var results = new Results(
      '#exercise-html',
      '/exercises/' + exercise + '/index.html'
    );
  };
});