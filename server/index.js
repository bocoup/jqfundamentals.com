var fs =            require('fs');
var yaml =          require('js-yaml');
var md =            require('marked');
var Faker =         require('Faker');
var _ =             require('underscore');
var path =          require('path');
var { promisify } = require('util');

var express =       require('express');
var app =           express();

// Express middlewares
var logger =        require('morgan');
var compression =   require('compression');
var bodyParser =    require('body-parser');
var favicon =       require('serve-favicon');

var contentDir =    __dirname + '/../content';
var exerciseDir =   __dirname + '/../exercises';

var dataDir =       __dirname + '/../data';
var htmlCache =     {};

var fakeData =      [];
var prod =          process.env.NODE_ENV === 'production';
var port =          process.env.NODE_ENV_PORT || 4444;
var cachebust =     'v' + new Date().getTime();

var readFile = promisify(fs.readFile);

for (var i = 0; i < 100; i++) {
  fakeData.push(Faker.Helpers.userCard());
}

app.use( logger('dev') );
app.use( compression() );
app.use( bodyParser.urlencoded({
  extended: true
}) );
app.use( bodyParser.json() );

if ( !prod ) {
  app.use( favicon(
    path.join(__dirname, '..', 'assets/img/favicon.ico'),
    { maxAge: 8640000000 }
  ) );

  app.use(
    '/public/' + cachebust,
    express.static(
      path.join(__dirname, '..', 'assets'),
      { maxAge: 8640000000 }
    )
  );

  app.use(
    '/public',
    express.static(
      path.join(__dirname, '..', 'assets')
    )
  );
}

app.use(
  '/legacy',
  express.static(
    path.join(__dirname, '..', 'legacy'),
    { maxAge: 8640000000 }
  )
);

app.set('views', path.join(__dirname, '..', 'templates'));
app.set('view engine', 'pug');

// allow template inheritance
app.set('view options', {
	layout: false
});

function render(filename, template, res) {
  var key = `${filename}-${template}`;

  if (prod && htmlCache[key]) {
    res.end(htmlCache[key]);
    return;
  }

  var rendr = promisify(res.render.bind(res));

  readFile(filename, 'utf8')
    .catch(err => {
      err._code = 404;
      throw err;
    }).then(async data => {
      var parts = data.split('---\n');
      var config = yaml.load(parts.shift());
      config.content = md(parts.shift());
      config.cachebust = cachebust;

      console.log(config);

      var str = await rendr(template, config);
      htmlCache[key] = str;
      res.end(str);
    }).catch(err => {
      console.error(err);
      error(res, err._code);
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
  res.sendfile(req.params.filename, {
    root: dataDir
  }, function(err) {
    if (err) {
      console.log(dataDir);
      console.log(err);
      res.json({});
    }
  });
});

app.get('/sandbox/:name', function(req, res) {
	var file = [ contentDir, req.params.name, 'sandbox', 'index.html' ].join('/');

  fs.readFile(file, function(err, data) {
    if (err) {
      error(res, 404);
      return;
    }

    res.render('iframe', {
      content: data,
      cachebust: cachebust
    });
  });
});

app.get('/exercises/:exercise/index.html', function(req, res) {
  var file = [ exerciseDir, req.params.exercise, 'index.html' ].join('/');

  fs.readFile(file, function(err, data) {
    if (err) {
      error(res, 404);
      return;
    }

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
  render( exerciseMarkdown, 'exercise', res );
});

app.get('/chapter/:name', function(req, res) {
	var chapterName = req.params.name;
	var chapterMarkdown = [ contentDir, chapterName, 'index.md' ].join('/');
  render( chapterMarkdown, 'chapter/index', res );
});

app.get('/500', function(req, res) {
  error(res, 500);
});

app.get('/*', function(req, res) {
  error(res, 404);
});

function error(res, code = 500) {
  var codes = {
    '404' : 'Not found',
    '500' : 'Server error'
  };

  res.status(code);
  res.render('error', {
    code: code,
    title: codes[code],
    cachebust: cachebust
  });
}

app.listen(port);

console.log('jqfundamentals started on http://localhost:' + port);
