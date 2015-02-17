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
    var events = this.state.events.map( (event, index) => {
      if(event.W !== 100) {
        event.R = event.R * event.W;
      }
      var divStyle = {
        top: event.start,
        left: event.R + '%',
        width: event.W + '%',
        height: ( event.end - event.start ) + 'px'
      };
      return (<div className="calendar--events__item" style={divStyle}>
                <p>Sample Item - Start: {event.start}</p>
                <p>Sample Location - End: {event.end}</p>
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
