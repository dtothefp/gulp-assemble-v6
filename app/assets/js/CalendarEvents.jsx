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
  _assignWidth() {
    //var map = [];
    //this.state.forEach((column, i) => {
      //var hor = [];
      //hor.push(column)
    //});
  },
  render() {
    //this.state.events.forEach( (column, index) => {
      //column.forEach((event, pos) => {
        //event.W = 100 / this.state.events.length;
        //event.R = index;
        //event.V = pos;
      //});
    //});

    //var events = _.flatten(this.state.events).map((event, i) => {
      //var divStyle = {
        //top: event.start,
        //left: event.R > 0 ? ( event.R * event.W ) + '%' : 0,
        //width: event.W + '%',
        //height: ( event.end - event.start ) + 'px'
      //};
      //return (<div className="calendar--events__item" style={divStyle}>
                //<p>Start: {event.start} - W: {event.W}%</p>
                //<p>End: {event.end} - R: %</p>
              //</div>
      //);
    //});
    var events = this.state.events.map((event) => {
      var divStyle = {
        top: event.start,
        left: event.R > 0 ? ( event.R * event.W ) + '%' : 0,
        width: event.W + '%',
        height: ( event.end - event.start ) + 'px'
      };
      return (<div className="calendar--events__item" style={divStyle}>
                <p>Start: {event.start} - W: {event.W}%</p>
                <p>End: {event.end} - R: {event.R * event.W}%</p>
                <p>Neighbors: {event.MAX}</p>
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
