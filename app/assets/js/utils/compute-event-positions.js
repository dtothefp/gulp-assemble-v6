var _ = require('lodash');
var horizontal = require('./trials/horizontal.js');
var vertical = require('./trials/vertical.js');

module.exports = function computeEventPositions(events) {
  //horizontal(events);
  return vertical(events);
};
