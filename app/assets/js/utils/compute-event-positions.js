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
      eventBoard[i].push(event.id);
    }
  });

  var isIncreasing = true;
  var lastNeighbors;
  var groups = [];
  var lastEventList = [];
  eventBoard.forEach((eventList, index) => {
    var numberOfEvents = eventList.length;
    var numberOfLastEvents = lastEventList.length;
    var W = 100;
    var clonedEvents = [];

    var diff = _.difference(eventList, lastEventList);
    //event list is bigger -- automatically store
    //event list is smaller -- all id's are in previous list -- splice out and don't store
    //event list is same length but some id's have changed 
    // else event list is same length and no id's have changed -- do nothingh
    if(diff.length > 0) {
      if(numberOfEvents < numberOfLastEvents) {
        groups.push(diff);
      } else if(numberOfEvents === numberOfLastEvents) {
        groups.push(diff);
      } else if(numberOfEvents > numberOfLastEvents) {
        groups.push(eventList);
      }
    } else {
      return false;
    }

    lastEventList = eventList;
  });

  //get the arrays sorted by length descending
  var sorted = groups.sort(function(a, b) {
    return b.length - a.length;
  });

  //loop through the nested array
  for(let i=0; i < sorted.length; i+=1) {
    let comparisonArr = sorted[i];
    let W = 100 / comparisonArr.length;

    //loop through the rest of the array
    for(let k=i+1; k < sorted.length; k+=1) {
      let nextArr = sorted[k];

      //compare each id in longest array to next longest and so on
      for(let j=0; j < comparisonArr.length; j+=1) {
        let comparisonId = comparisonArr[j];
        let matchingIndex = nextArr.indexOf(comparisonId);

        if( matchingIndex > -1 ) {
          nextArr.splice(matchingIndex, 1);
        }

      }//end j for loop

    }//end k for loop

    comparisonArr.forEach(function(id, index) {
      var event = _.filter(events, {id: id})[0];
      event.W = W;
      event.R = index;
    });

  }//end i for loop
  debugger;
};
