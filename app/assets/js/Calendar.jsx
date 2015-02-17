'use strict';

var React = require('react');
var CalendarEvents = require('./CalendarEvents');
var CalendarTimes = require('./CalendarTimes');
var AppActions = require('./actions');

var Calendar = React.createClass({
  render() {
    return (
      <div className="calendar--wrapper flex">
      <CalendarTimes />
      <CalendarEvents />
      </div>
    );
  }
});

module.exports = Calendar;
