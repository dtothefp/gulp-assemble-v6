var constants = require('../constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var AppActions = {
  updateEvents(events) {
    AppDispatcher.handleEventAction({
      actionType: constants.ADD_EVENTS,
      events: events
    });
  },
  defaultEvents() {
    AppDispatcher.handleEventAction({
      actionType: constants.LOAD_DEFAULT_EVENTS
    });
  }
};

module.exports = AppActions;
