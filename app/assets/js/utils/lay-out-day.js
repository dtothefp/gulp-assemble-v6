var AppActions = require('../actions');
var computeEventPositions = require('./compute-event-positions');
var defaultEvents = require('./default-events');

module.exports = function layOutDay(events) {
  var eventBoard;
  if(events) {
    eventBoard = computeEventPositions(events || defaultEvents);
  }
  return events ? AppActions.updateEvents(eventBoard) : AppActions.defaultEvents();
};
