var fs =          require('fs');
var Q =           require('q');
var yaml =        require('js-yaml');
var express =     require('express');
var md =          require('marked');
var Faker =       require('Faker');
var _ =           require('underscore');

var app =         express.createServer(
                    express.logger(),
                    express.bodyParser()
                  );

var contentDir =  __dirname + '/../content';
var dataDir =     __dirname + '/../data';
var htmlCache =   {};
var useCache =    false;

var fakeData =    [];

for (var i = 0; i < 100; i++) {
  fakeData.push(Faker.Helpers.userCard());
}

app.configure(function() {
  app.use('/public', express['static'](__dirname + '/../public'));
  app.use(app.router);
});

app.configure('production', function() {
  useCache = true;
});

app.set('views', __dirname + '/../templates');
app.set('view engine', 'jade');

// allow template inheritance
app.set('view options', {
	layout: false
});

function render(filename, template, res) {
	var dfd = Q.defer();
  var key = filename + '-' + template;

  if (useCache && htmlCache[key]) {
    res.end(htmlCache[key]);
    return;
  }

	fs.readFile(filename, 'utf8', function(err, data) {
		if (err) {
			dfd.reject(err);
		} else {
			var parts = data.split('---\n');
			dfd.resolve([yaml.load(parts[0]), md(parts[1])]);
		}
	});

  dfd.promise.then(function(parts) {
    var config = parts[0];
    config.content = parts[1];

    res.render(template, config, function(err, str) {
      htmlCache[key] = str;
      res.end(str);
    });
  });
}

app.get('/', function(req, res) {
  var homeMarkdown = [ contentDir, 'index.md' ].join('/');
  render( homeMarkdown, 'home', res );
});

app.get("/data/search.json", function(req, res) {
  var query = req.query.q;
  var results = [];

  if (query && query.trim()) {
    results = _.filter(fakeData, function(item) {
      var possibles = [ item.name, item.username, item.company.name ];
      return _.any(possibles, function(p) {
        return p.toLowerCase().match(query.toLowerCase());
      });
    });
  }

  res.json({ results : results });
});

app.get('/data/search/sample.json', function(req, res) {
  var sample = [];

  for (var i = 0; i < 10; i++) {
    sample.push(fakeData[i]);
  }

  res.json({ results : sample });
});

app.post("/data/save", function(req, res) {
  var data = req.body;

  if (data) {
    data.saved = true;
  }

  res.json(data || {});
});

app.get('/data/:filename', function(req, res) {
  var file = [ dataDir, req.params.filename ].join('/');
  res.sendfile(file, function(err) {
    if (err) {
      res.json({});
    }
  });
});

app.get('/sandbox/:name', function(req, res) {
	var fileName = req.params.file;
	var file = [ contentDir, req.params.name, 'sandbox', 'index.html' ].join('/');

  fs.readFile(file, function(err, data) {
    res.render('iframe', {
      content: data
    });
  });
});

app.get('/chapter/:name', function(req, res) {
	var chapterName = req.params.name;
	var chapterMarkdown = [ contentDir, chapterName, 'index.md' ].join('/');
  render( chapterMarkdown, 'chapter/index', res );
});

app.listen('4444');
console.log('jqfundamentals started on http://localhost:4444');
