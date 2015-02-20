var AppActions = require('../actions');
var computeEventPositions = require('./compute-event-positions');
var defaultEvents = require('./default-events');

module.exports = function layOutDay(events) {
  if(events) {
    var eventBoard = computeEventPositions(events || defaultEvents);
  }
  console.log(eventBoard);
  return events ? AppActions.updateEvents(eventBoard) : AppActions.defaultEvents();
};
