var AppActions = require('../actions');
var computeEventPositions = require('./compute-event-positions');
var defaultEvents = require('./default-events');

module.exports = function layOutDay(events) {
  computeEventPositions(events || defaultEvents);
  return events ? AppActions.updateEvents(events) : AppActions.defaultEvents();
};
