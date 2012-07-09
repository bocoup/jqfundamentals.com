$(function() {
  $('#main pre > code').each(function() {
    var code = $(this);
    var pre = code.parent();
    var example = $('<div>', {
      'class' : 'example'
    }).insertBefore(pre)[0];

    new CodeEditor(window, {
      content : $.trim(code.text()),
      target : example
    });

    pre.remove();
  });
});
