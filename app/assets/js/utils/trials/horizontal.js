module.exports = function(events) {
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

  var sorted = eventBoard.sort(function(a,b) {
    return b.length - a.length;
  });

  var isIncreasing = true;
  var lastNeighbors;
  var groups = [];
  var lastEventList = [];
  sorted.forEach((eventList, index) => {
    var numberOfEvents = eventList.length;
    var numberOfLastEvents = lastEventList.length;
    var diff = _.difference(eventList, lastEventList);

    if(diff.length > 0) {
      groups.push(eventList);
    }

    lastEventList = eventList;
  });

  //loop through the nested array
  var finalGroup = [];
  for(let i=0; i < groups.length; i+=1) {
    let comparisonArr = groups[i];
    let W = 100 / comparisonArr.length;

    //loop through the rest of the array
    for(let k=i+1; k < groups.length; k+=1) {
      let nextArr = groups[k];

      //compare each id in longest array to next longest and so on
      //if the index in the smaller group is not in the larger group but is in a group that contains larger group members
      //must incorporate it into the larger group and remove it from the smaller group
      for(let j=0; j < comparisonArr.length; j+=1) {
        let comparisonId = comparisonArr[j];
        let matchingIndex = nextArr.indexOf(comparisonId);

        if( matchingIndex > -1 && k === 1) {
          //nextArr.splice(matchingIndex, 1);
          finalGroup.push( comparisonArr.concat(nextArr) );
          break;
        }

      }//end j for loop

    }//end k for loop

    //comparisonArr.forEach(function(id, index) {
      //var event = _.filter(events, {id: id})[0];
      //event.W = W;
      //event.R = index;
    //});

  }//end i for loop

  var filtered = groups.filter(function(arr) {
    if(arr.length > 0) {
      return arr;
    }
  });

  var nestedEvents = [];
  filtered.forEach(function(eventList) {
    let W = 100 / eventList.length;

    var map = eventList.map(function(eventId, index) {
      var event = _.filter(events, {id: eventId})[0];
      event.W = W;
      event.R = index;
      return event;
    });

    nestedEvents.push(map);

  });

  debugger;

};
