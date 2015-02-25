var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var CHANGE_EVENT = 'change';
var _events;

var EventStore = assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  getEvents() {
    return _events;
  },
  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch(action.actionType) {
      case constants.ADD_EVENTS:
        _events = action.events;
        break;
      case constants.LOAD_DEFAULT_EVENTS:
        _events = defaultEvents.events;
        break;
      default:
        _events = defaultEvents.events;
        break;
    }

    EventStore.emitChange();

    return true;
  })
});

module.exports = EventStore;

