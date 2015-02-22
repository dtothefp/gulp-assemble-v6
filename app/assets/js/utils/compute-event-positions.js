var _ = require('lodash');
var horizontal = require('./trials/horizontal.js');
var vertical = require('./trials/vertical.js');
var groups = require('./trials/groups.js');
var relatedGroups = require('./trials/related-groups.js');

module.exports = function computeEventPositions(events) {
  //horizontal(events);
  return relatedGroups(events);
};
