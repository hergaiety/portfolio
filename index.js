var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var sass        = require('metalsmith-sass');
var layouts     = require('metalsmith-layouts');
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
  .use(permalinks())
  .use(sass())
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(serve())
  .use(
    watch({
      paths: {
        "src/**/*": true,
        "layouts/**/*": true
      },
      livereload: true,
    })
  )
  .build(function(err, files) {
    if (err) { throw err; }
  });
