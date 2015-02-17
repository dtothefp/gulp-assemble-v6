'use strict';

var React = require('react');
var EventStore = require('./stores/events-store');

function storedEvents() {
  return {events: EventStore.getEvents()};
}

var CalendarEvents = React.createClass({
  getInitialState() {
    return storedEvents();
  },
  componentWillMount() {
    EventStore.addChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(storedEvents());
  },
  render() {
    var events = this.state.events.map( (event) => {
      return (<div className="calendar--events__item">
                <p>Sample Item</p>
                <p>Sample Location</p>
              </div>
      );
    });
    return (
      <div className="calendar--events flex-1">{events}</div>
    );
  }
});

module.exports = CalendarEvents;
