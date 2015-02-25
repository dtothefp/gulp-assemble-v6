var constants = require('../constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var relatedGroups2 = require('../utils/trials/related-groups-2');
var defaultEvents = require('../utils/default-events');

var AppActions = {
  updateEvents(events) {
    AppDispatcher.handleEventAction({
      actionType: constants.ADD_EVENTS,
      events: relatedGroups2(events)
    });
  },
  defaultEvents() {
    AppDispatcher.handleEventAction({
      actionType: constants.LOAD_DEFAULT_EVENTS,
      events: relatedGroups2(defaultEvents)
    });
  }
};

module.exports = AppActions;
