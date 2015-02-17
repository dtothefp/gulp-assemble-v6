var assign = require('object-assign');
var Dispatcher = require('./dispatcher');

var AppDispatcher = assign(Dispatcher.prototype, {
  handleEventAction(action) {
    this.dispatch({
      source: 'GLOBAL_ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;
