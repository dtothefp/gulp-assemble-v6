var _ = require('lodash');

module.exports = function(events) {
  class Groups {
    constructor(events) {
      this.events = events.sort((a,b) => a.start - b.start);
      this.relatedGroups = [];
      this.makeGroups();
      this.assignWidths();
    }

    makeGroups() {
      this.groups = this.events.reduce((map, event, index) => {
        if(index === 0) {
          event.R = 0;
          map.push([event]);
          return map;
        }

        var lastMapIndex = map.length - 1;
        var lastGroup = map[lastMapIndex];
        var filtered = this.filterGroups(event, lastGroup);

        if(filtered) {
          //if the filtered length is the same as the last group length then need to create
          if(lastGroup.length === filtered.length) {
            event.R = 0;
            //pushing a new array into the map creates a new group
            map.push([event]);
          } else {
            var recursed = this.recurseFiltered(filtered, event);
            //potentially the recursed value will be undefined if all filtered events have
            //neighbors with end times greater than the current events' start time
            if(!recursed && typeof recursed === 'undefined') {
              //use the last item in the last group as reference for horizontal positioning
              //and push the even into the last group array
              event.R = _.max(lastGroup, 'R').R + 1;
              map[lastMapIndex].push(event);
            } else {
              //if previous neighbors exist push the current event into the neighbors array
              //of the previous event so that it may be referenced later, otherwise create
              //a neighbors array for the prvious event with the current event in it
              if(recursed.neighbors) {
                recursed.neighbors.push(event);
              } else {
                recursed.neighbors = [event];
              }
              //always create an event horizontal position equal to that of it's neighbor
              //in this case a neighbor is an event that exists vertically above the event 
              //in the same group, but this neighbor has an end time less than the current
              //events' start time
              event.R = recursed.R;
              lastGroup.push(event);
            }
          }
        } else {
          //use the last item in the last group as reference for horizontal positioning
          //and push the even into the last group array
          event.R = lastGroup[lastGroup.length - 1].R + 1;
          map[lastMapIndex].push(event);
        }

        return map;
      }, []);
    }

    recurseFiltered(filteredEvents, event) {
      var suitableNeighbor;
      for(let i=0; i < filteredEvents.length; i+=1) {
        let adjacentEvent = filteredEvents[i];
        let lastNeighbor = adjacentEvent.neighbors ? adjacentEvent.neighbors.slice(-1)[0] : {};

        if(adjacentEvent.neighbors && lastNeighbor.end < event.start) {
          //recurse through neighbors of neighbors
          suitableNeighbor = this.recurseFiltered([ lastNeighbor ], event);
          //potentially after recursion a suitable event won't be found so it
          //will be necessary to continue with the for loop
          if(suitableNeighbor) {
            break;
          } else {
            continue;
          }
        } else if(!adjacentEvent.neighbors && typeof adjacentEvent.neighbors === 'undefined'){
          //if the first encountered filtered event has no neighbors return it immediately
          suitableNeighbor = adjacentEvent;
          break;
        }
      }

      return suitableNeighbor;
    }

    recurseNeighbors(event, compare) {
      var relatedEvent;
      for(let i=0; i < compare.lenght; i+=1) {

        if(event.start > compare.end && !compare.neighbors && typeof compare.neighbors === 'undefined') {
          relatedEvent = compare;
          break;
        } else if(event.start > compare.end && compare.neighbors.length > 0) {
          relatedEvent = this.recurseNeighbors(event, compare.neighbors);
          break;
        }
      }

      return relatedEvent;
    }

    filterGroups(event, lastGroup) {
      //if this is populated we must start a new group
      //it will contain all events from the past group that it starts later than
      //may potentially be some members of the last group that it doesn't start later than
      var filtered = lastGroup.filter((pastEvent) => {
        if(event.start > pastEvent.end) {
          //if(pastEvent.neighbors) {
            //let recursed = this.recurseNeighbors(event, pastEvent.neighbors);
            //return recursed;
          //} else {
            //return pastEvent;
          //}
          return pastEvent;
        }
      });

      //if there are events in the group that the current event start time is greater
      //than the previously grouped end times then return these events
      if(filtered.length > 0) {
        return filtered;
      } else {
        return false;
      }
    }

    assignWidths() {
      this.groups.forEach((group) => {
        //find the maximum R (horizontal position) value for the group and use it to
        //calculate width
        var largestHosPos = _.max(group, 'R');
        var W = 100 / (largestHosPos.R + 1);
        group.forEach((event) => {
          event.W = W;
        });
      });
    }
  }

  var grouper = new Groups(events);
  return grouper.events;
};
