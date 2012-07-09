var fs = require('fs');
var Q = require('q');
var yaml = require('js-yaml');
var express = require('express');
var md = require('node-markdown').Markdown;

var app = express.createServer();
var contentDir = __dirname + '/../content';

app.use(app.router);
app.use('/public', express['static'](__dirname + '/../public'));

app.set('views', __dirname + '/../templates');
app.set('view engine', 'jade');

// allow template inheritance
app.set('view options', { layout: false });

function convertMarkdownToHtml(filename, cb) {
  var dfd = Q.defer();

  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      dfd.reject(err);
    } else {
      dfd.resolve(md(data));
    }
  });

  return dfd.promise;
}

function loadYAML(filename) {
  var dfd = Q.defer();

  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      dfd.reject(err);
    } else {
      dfd.resolve(yaml.load(data));
    }
  });

  return dfd.promise;
}

app.get('/', function(req,res) {
  convertMarkdownToHtml(
    [ contentDir, 'index.md' ].join('/'),
    function(html) {
      res.render('home', {
        title : false,
        content : html
      });
    }
  );
});

app.get('/exercises/:name/:file', function(req, res) {
  var fileName = req.params.file;
  var file = [ contentDir, req.params.name, 'exercises', fileName ].join('/');

  if (/.html$/.test(file)) {
    fs.readFile(file, function(err, data) {
      res.render('iframe', {
        content : data
      });
    });
  } else {
    fs.createReadStream(file).pipe(res);
  }
});

app.get('/chapter/:name', function(req, res) {
  var chapterName = req.params.name;
  var chapterMarkdown = [ contentDir, chapterName, 'index.md' ].join('/');
  var chapterConfig = [ contentDir, chapterName, 'config.yaml' ].join('/');

  Q.all([
    convertMarkdownToHtml(chapterMarkdown),
    loadYAML(chapterConfig)
  ]).then(function(results) {
    console.log('results is', results);
    var data = results[0];
    var config = results[1];

    res.render('chapter/index', {
      content : data,
      title : config.title,
      exercises : config.exercises
    });
  });

});

app.listen('4444');
console.log('jqfundamentals started on http://localhost:4444');
