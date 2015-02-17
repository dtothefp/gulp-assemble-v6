var AppActions = require('../actions');

module.exports = function layOutDay(events) {
  return events ? AppActions.updateEvents(events) : AppActions.defaultEvents();
};
