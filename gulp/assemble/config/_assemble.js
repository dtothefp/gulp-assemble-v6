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
    layouts: getGlob('templates/layouts/*.hbs'),
    data: getGlob('pages/**/*.{json,yml}'),
    partials: getGlob('templates/partials/*.hbs'),
    environment: global.isWatching ? 'dev' : 'prod',
    helpers: getGlob('assets/js/helpers/*.js')
  },
  pages: {
    files: [
      { 
        cwd: path.join(process.cwd(), 'app'), 
        src: getGlob('pages/**/*.hbs'),
        dest: config.dest + '/'
      }
    ]
  }
};
