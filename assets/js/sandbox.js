var log = window.log = function(msg) {
  var p = document.createElement('p');
  p.innerHTML = msg;
  document.body.appendChild(p);
};