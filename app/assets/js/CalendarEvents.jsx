'use strict';

var _ = require('lodash');
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
    var events = this.state.events.map((event) => {
      var divStyle = {
        top: event.start,
        left: event.R > 0 ? ( event.R * event.W ) + '%' : 0,
        width: event.W + '%',
        height: ( event.end - event.start ) + 'px'
      };
      return (<div className="calendar--events__item" style={divStyle}>
                <p>Start: {event.start}</p>
                <p>End: {event.end}</p>
                <p>ID: {event.id}</p>
              </div>
      );
    });
    return (
      <div className="calendar--events flex">
        <div className="calendar--events__inner">{events}</div>
      </div>
    );
  }
});

module.exports = CalendarEvents;
