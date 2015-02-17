'use strict';

var React = require('react');

var TimeSlot = React.createClass({
  render() {
    if(!!this.props.period) {
      return (
        <div className="calendar--times__item">
          <span className="calendar--times__time">{this.props.data}</span>
          <span className="calendar--times__period">{this.props.period}</span>
        </div>
      );
    } else {
      return (
        <div className="calendar--times__item">
          <span className="calendar--times__time">{this.props.data}</span>
        </div>
      );
    }
  }
});

module.exports = TimeSlot;
