var _ = require('lodash');

module.exports = function(events) {

  var Groups = (() => {

    var _filterGroups = function _filterGroups(event, lastGroup) {
      var neighbors, highestNeighbor;
      var omitFromFilter = [];
      var totalFilteredEvents = 0;

      var filtered = lastGroup.filter((pastEvent) => {
        var filteredVal;
        var neighbors = _.filter(lastGroup, {R: pastEvent.R});

        if(event.start > pastEvent.end) {
          totalFilteredEvents += 1;
          //return early if a previous event had a neighbor that was referenced
          if(omitFromFilter.length > 0 && omitFromFilter.indexOf(pastEvent.R) !== -1) {
            //if previously cached return nothing
            filteredVal = false;
          } else if (neighbors.length > 1) {
            //if the compared event has neighbors (vertically underneath) then compare against the highest
            //end value and cache the neighbors so they are omited from subsequent filter recursion
            omitFromFilter.push(pastEvent.R);
            highestNeighbor = _.max(neighbors, 'end');

            filteredVal = event.start > highestNeighbor.end ? highestNeighbor : false;
          } else {
            //if current event start is greater than end and it has no neighbors return the past event
            filteredVal =  pastEvent;
          }

          return filteredVal;
        } else {
          return false;
        } //end if start/end comparison

      });

      return totalFilteredEvents === lastGroup.length ? {newGroup: true} : filtered;

    };


    return class Groups {
      constructor(events) {
        this.events = events.sort((a,b) => a.start - b.start);
      }

      makeGroups() {
        this.groups = this.events.reduce((map, event, index) => {
          var filtered, lastMapIndex, lastGroup;

          if(index === 0) {
            event.R = 0;
            map.push([event]);
          } else {
            lastMapIndex = map.length - 1;
            lastGroup = map[lastMapIndex];
            filtered = _filterGroups(event, lastGroup);

            if(filtered.length > 0) {
              //always create an event horizontal position equal to that of it's neighbor
              //in this case a neighbor is an event that exists vertically above the event 
              //in the same group, but this neighbor has an end time less than the current
              //events' start time
              event.R = filtered[0].R;
              lastGroup.push(event);
            } else if(filtered.newGroup) {
              //if the filtered length is the same as the last group length then need to create
              //pushing a new array into the map creates a new group 
              event.R = 0;
              map.push([event]);
            } else {
              //if the event start is not greater than the end for any events in the last group
              //use the last item in the last group as reference for horizontal positioning
              //and push the even into the last group array
              event.R = lastGroup[lastGroup.length - 1].R + 1;
              map[lastMapIndex].push(event);
            }
          }
          event.id = index;

          return map;
        }, []);
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

      init() {
        this.makeGroups();
        this.assignWidths();
        return this.events;
      }
    };

  })();

  var grouper = new Groups(events);
  return grouper.init();
};
