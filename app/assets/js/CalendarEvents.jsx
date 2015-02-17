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
      var R;
      if(event.W !== 100) {
        event.R = event.R * event.W;
      }
      var divStyle = {
        top: event.start,
        left: event.R ? event.R + '%' : 0,
        width: event.W + '%',
        height: ( event.end - event.start ) + 'px'
      };
      console.log(divStyle);
      return (<div className="calendar--events__item" style={divStyle}>
                <p>Sample Item - Start: {event.start} - W: {event.W}%</p>
                <p>Sample Location - End: {event.end} - R: {event.R}%</p>
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
