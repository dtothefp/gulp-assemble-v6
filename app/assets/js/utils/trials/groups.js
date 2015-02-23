var _ = require('lodash');

module.exports = function(events) {
  var sortedEvents = events.sort((eventA, eventB) => eventA.start - eventB.start);

  var getNeighbors = function getNeighbors(events) {
    events.forEach((event, index) => {
      event.neighbors = [];
      event.id = index;
      var eventInterval = event.start + (event.end - event.start);
      for(let i = 0; i < events.length; i+=1) {
        if(i === index) continue;
        let neighbor = events[i];

        if(
          event.start >= neighbor.start && event.start <= neighbor.end  // jshint ignore:line
          || event.end >= neighbor.start && event.start <= neighbor.end // jshint ignore:line
        ) {
          event.neighbors.push(neighbor);
        }

      }
    });
  };

  getNeighbors(sortedEvents);

  var groups = [];
  var calculateWidth = function calculateWidth(events) {
    var W;
    events.forEach((event, index) => {
      if(index === 0) {
        W = event.W ? event.W : 100 / events.length;
      }
      event.W = W;
    });
    groups.push(events);
  };

  var previousEvents = [];
  var calculateHorPos = function calculatePosition(event, index) {
    var lastEvent = previousEvents.slice(-1)[0];
    var filtered;
    var lastFiltered;
    //if there was a last event and it was in the same group of neighbors
    if(lastEvent && lastEvent.neighbors.length === event.neighbors.length) {
      filtered = event.neighbors.filter((neighbor) => {
        if( neighbor.R || neighbor.R === 0 ) {
          if(event.start <= neighbor.end) {
            return neighbor;
          }
        }
      }).sort((a, b) => a.R - b.R);
      //get the last event in the filtered list
      lastFiltered = filtered.slice(-1)[0];
      event.R = lastFiltered.R + 1;
      if (events.length - 1 === index) {
        calculateWidth( previousEvents.concat([event]));
      }
      if(lastFiltered.id !== lastEvent.id) {
        calculateWidth( previousEvents );
        //get the reference event to measure width off of
        previousEvents = filtered.concat([event]);
      } else if(previousEvents.length === event.neighbors.length) {
        calculateWidth( previousEvents );
        previousEvents = [];
      } else {
        //push the last events if there is no R reset
        previousEvents.push(event);
      }
    }
    //not getting the width of the last event
    else {
      if(lastEvent && lastEvent.neighbors.length !== event.neighbors.length) {
        calculateWidth( previousEvents );
      }
      event.R = 0;
      previousEvents = [event];
    }

  };

  var calculatePosition = function calculatePosition(events) {
    events.forEach((event, index) => {
      var sortedNeighbors = event.neighbors.sort((a, b) => b.neighbors.length - a.neighbors.length);
      var adjacentNeighbors;

      if(event.neighbors.length < sortedNeighbors[0].neighbors.length) {
        var clone = _.clone(sortedNeighbors[0].neighbors);
        adjacentNeighbors = clone.concat( [sortedNeighbors[0]] );
      }
      var sortedById = ( adjacentNeighbors ? adjacentNeighbors : sortedNeighbors).sort((a, b) => a.id - b.id);

      var filtered = sortedById.filter((currentEvent) => currentEvent.id !== event.id );
      event.neighbors = filtered;

      calculateHorPos(event, index);
    });
  };

  calculatePosition(events);
  var lastFirstIndex;
  //need to potentially recalculate widths of groups
  groups.forEach((group) => {
    var sorted;
    //if(lastFirstIndex !== group[0].id) {
      sorted = group.sort((a,b) => b.end - a.end);
      sorted.forEach((event, index) => {
        //event.R = index;
      });
      //lastFirstIndex = sorted[0].id;
    //}
  });
  return events;
};
