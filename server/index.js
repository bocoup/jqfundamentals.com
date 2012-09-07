var fs =            require('fs');
var Q =             require('q');
var yaml =          require('js-yaml');
var express =       require('express');
var md =            require('marked');
var Faker =         require('Faker');
var _ =             require('underscore');

var app =           express(
                      express.logger(),
                      express.bodyParser()
                    );

var contentDir =    __dirname + '/../content';
var exerciseDir =   __dirname + '/../exercises';

var dataDir =       __dirname + '/../data';
var htmlCache =     {};

var fakeData =      [];
var prod =          process.env.NODE_ENV === 'production';
var port =          process.env.NODE_ENV_PORT || 4444;
var cachebust =     'v' + new Date().getTime();

for (var i = 0; i < 100; i++) {
  fakeData.push(Faker.Helpers.userCard());
}

app.use( express.compress() );

app.use( express.favicon(
  __dirname + '/../public/img/favicon.ico',
  { maxAge: 8640000000 }
) );

app.use(
  '/public/' + cachebust,
  express.static(
    __dirname + ( prod ? '/../build' : '/../public' ),
    { maxAge: 8640000000 }
  )
);

app.use(
  '/public',
  express.static(
    __dirname + ( prod ? '/../build' : '/../public' )
  )
);

app.use(
  '/legacy',
  express.static(
    __dirname + '/../legacy',
    { maxAge: 8640000000 }
  )
);

app.use( app.router );

app.set('views', __dirname + '/../templates');
app.set('view engine', 'jade');

// allow template inheritance
app.set('view options', {
	layout: false
});

function render(filename, template, res) {
	var dfd = Q.defer();
  var key = filename + '-' + template;

  if (prod && htmlCache[key]) {
    res.end(htmlCache[key]);
    return;
  }

	fs.readFile(filename, 'utf8', function(err, data) {
		if (err) {
			dfd.reject(err);
		} else {
			var parts = data.split('---\n');
			dfd.resolve( [ yaml.load(parts[0]), md(parts[1]) ] );
		}
	});

  dfd.promise.then(function(parts) {
    var config = parts[0];
    config.content = parts[1];
    config.cachebust = cachebust;

    res.render(template, config, function(err, str) {
      htmlCache[key] = str;
      res.end(str);
    });
  });
}

function findResults(query) {
  if ( !query || !query.trim() ) { return []; }

  var q = query.toLowerCase();

  return _.filter(fakeData, function(item) {
    var possibles = [ item.name, item.username, item.company.name ];
    return _.any(possibles, function(p) {
      return p.toLowerCase().match(q);
    });
  });
}

app.get('/', function(req, res) {
  var homeMarkdown = [ contentDir, 'index.md' ].join('/');
  render( homeMarkdown, 'home', res );
});

app.get("/data/search.json", function(req, res) {
  res.json({ results : findResults(req.query.q) });
});

app.get("/data/search.jsonp", function(req, res) {
  res.jsonp({ results : findResults(req.query.q) });
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
	var file = [ contentDir, req.params.name, 'sandbox', 'index.html' ].join('/');

  fs.readFile(file, function(err, data) {
    res.render('iframe', {
      content: data,
      cachebust: cachebust
    });
  });
});

app.get('/exercises/:exercise/index.html', function(req, res) {
  var file = [ exerciseDir, req.params.exercise, 'index.html' ].join('/');

  fs.readFile(file, function(err, data) {
    res.render('iframe', {
      content: data,
      cachebust: cachebust
    });
  });
});

app.get('/exercises/:exercise', function(req, res) {
  var exerciseMarkdown = [
    exerciseDir,
    req.params.exercise,
    'index.md'
  ].join('/');
  render( exerciseMarkdown, 'exercise', res);
});

app.get('/chapter/:name', function(req, res) {
	var chapterName = req.params.name;
	var chapterMarkdown = [ contentDir, chapterName, 'index.md' ].join('/');
  render( chapterMarkdown, 'chapter/index', res );
});

app.get('/*', function(req, res) {
  res.status(404);
  res.render('404', {
    title: 'Not found',
    cachebust: cachebust
  });
});

app.listen(port);

console.log('jqfundamentals started on http://localhost:' + port);