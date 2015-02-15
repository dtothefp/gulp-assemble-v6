var path = require('path');
var config = require('../../config');
var templatesCwd = process.cwd() + config.src;
var globby = require('globby');

var getGlob = function(fp) {
  return globby.sync(fp, {cwd: templatesCwd});
};

module.exports = {
  options: {
    assets: config.dest + '/assets',
    layouts: templatesCwd +'/templates/layouts/*.hbs',
    data: templatesCwd + '/pages/**/*.{json,yml}',
    partials: templatesCwd + '/templates/partials/*.hbs',
    environment: global.isWatching ? 'dev' : 'prod',
    helpers: 'app/helpers/*.js'
  },
  pages: {
    files: [
      { 
        cwd: path.join(process.cwd(), 'app'), 
        src: ['pages/**/*.hbs'],
        dest: config.dest + '/'
      }
    ]
  }
};
