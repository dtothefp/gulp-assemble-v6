'use strict';

var React = require('react');
var TimeSlot = require('./TimeSlot');

var CalendarTimes = React.createClass({
  render() {
    var amTimes = [],
      pmTimes = [];
    for(let i = 9; i <= 11; i+=1) {
      amTimes.push(i + ':00', i + ':30');
    }
    for(let i = 0; i <= 9; i+=1) {
      let pmTimesList;
      switch (i) {
        case 0:
          pmTimesList = [
            12 + ':00',
            12 + ':30'
          ];
          break;
        case 9:
          pmTimesList = [
            i + ':00'
          ];
          break;
        default:
          pmTimesList = [
            i + ':00',
            i + ':30'
          ];
        break;
      }
      pmTimesList.forEach((time) => {
        pmTimes.push(time);
      });
    }
    var timesList = amTimes.concat(pmTimes).map( (time, index) => {
      var period = index < 5 ? 'am' : 'pm';
      return (
        <TimeSlot
          key={time + '-' + index}
          uid={index}
          data={time}
          period={index % 2 === 0 ? period : ''}
        />
      );
    });

    return (
      <div className="calendar--times">
        {timesList}
      </div>
    );
  }
});

module.exports = CalendarTimes;
