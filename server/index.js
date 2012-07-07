var fs = require('fs');
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
  fs.readFile(filename, 'utf8', function(err, data) {
    if (!err) {
      cb(md(data));
    }
  });
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
  var chapterConfig = require([ contentDir, chapterName, 'config.yaml' ].join('/'));

  convertMarkdownToHtml(
    chapterMarkdown,
    function(err, data) {
      res.render('chapter/index', {
        content : data,
        title : chapterConfig.title,
        exercises : chapterConfig.exercises
      });
    }
  );

});

app.listen('4444');
console.log('jqfundamentals started on http://localhost:4444');
