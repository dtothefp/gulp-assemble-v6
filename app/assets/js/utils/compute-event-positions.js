var _ = require('lodash');

module.exports = function computeEventPositions(events) {
  var eventBoard = [];
  var BOARD_HEIGHT = 720;

  while(BOARD_HEIGHT) {
    eventBoard.push([]);
    BOARD_HEIGHT -= 1;
  }

  //TODO: how to prevent duplicates??
  events.forEach((event, index) => {
    var start = event.start;
    var end = event.end;
    event.id = index;
    for(let i=start; i < end; i+=1) {
      eventBoard[i].push(event);
    }
  });

  var cachedIdList = [];
  eventBoard.forEach((eventList, index) => {
    var numberOfEvents = eventList.length
    var W = 100;
    var isCached;
    var hasWidth;
    var event;
    if(!numberOfEvents) {
      return;
    }
    //if more than one event exists at the timeslot
    if(numberOfEvents > 1) {
      W  /= numberOfEvents;
      for(let i=0; i < numberOfEvents; i+=1) {
        event = eventList[i];
        isCached = cachedIdList.indexOf(event.id) !== -1;
        hasWidth = event.W ? event.W : false;
        //if the id is cached
        // -- could be the first time encountering this event
        // -- could have been encountered but had no neighbors
        if(!isCached) {
          event.W = W;
          event.R = i;
          cachedIdList.push(event.id);
        } else if(hasWidth === 100) {
          event.W = W
          event.R = i;
        }
      }

    } else if(numberOfEvents === 1) {
      event = eventList[0];
      if(cachedIdList.indexOf(event.id) === -1) {
        event.W = W
        cachedIdList.push(event.id);
      }
    }

  });

};
