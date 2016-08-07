var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var sass        = require('metalsmith-sass');
var layouts     = require('metalsmith-layouts');
var assets      = require('metalsmith-assets');
var permalinks  = require('metalsmith-permalinks');
var serve       = require('metalsmith-serve');
var watch       = require('metalsmith-watch');

Metalsmith(__dirname)
  .metadata({
    title: "Joe Wroten",
    description: "",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src')
  .destination('./build')
  .clean(false)
  .use(markdown())
  .use(assets({
    source: './src/assets',
    destination: './src/assets'
  }))
  .use(permalinks())
  .use(sass())
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .use(
    watch({
      paths: {
        "src/**/*": "**/*",
        "partials/**/*": "**/*",
        "layouts/**/*": "**/*"
      },
      livereload: true,
    })
  )
  .use(serve())
  .build(function(err, files) {
    if (err) { throw err; }
  });
