module.exports = function(events) {
  var eventBoard = [];
  var BOARD_HEIGHT = 720;

  var sortedEvents = events.sort((eventA, eventB) => eventA - eventB);

  var compareEvents = function compareEvents(events) {

    events.forEach((event, index) => {
      var eventInterval = event.end - event.start;
      var currentEnd = event.end;
      if(index === 0) {
        eventBoard.push([event]);
      } else {
        recurseBoard(eventBoard, event);
      }
    });

    return eventBoard;
  };

  var recurseBoard = function(board, event) {
    var currentInterval = event.end - event.start;

    board.forEach((column, index) => {
      var cell = column[ column.length -1 ];
      var neededSpace = cell.end + currentInterval;
      //need to adjust this logic to search through the rest of the array for events that will fit underneath if the next one won't
      //only should compare the last item in each column
      //check if there is enough space for the event and if it starts after the one above finishes
      //need to calculate the width and horizontal position somehow
      if(neededSpace <= BOARD_HEIGHT && event.start > cell.end) {
        column.push(event);
        return true;
      }
      //if no spaces were found start a new column
      else if(index === board.length - 1) {
        board.push([event]);
      }

    });
  };

  var assignWidthPosition = function assignWidthPosition(board) {

  };

  return compareEvents(sortedEvents);

};
