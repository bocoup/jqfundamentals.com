require.config({
  baseUrl : '../public',
  deps : [ 'js/chapter' ],
  shim : {
    'vendor/codemirror' : {
      deps : [ 'vendor/CodeMirror-2.25/lib/codemirror'],
      exports : 'CodeMirror'
    },
    'vendor/bootstrap/js/bootstrap' : {
      deps : [ 'jquery' ]
    }
  },
  paths : {
    'bootstrap' : 'vendor/bootstrap/js/bootstrap',
    'jquery' : 'vendor/jquery',
    'widgets' : 'js/widgets'
  }
});