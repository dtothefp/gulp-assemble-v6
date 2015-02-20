'use strict';
require('../scss/main'); // jshint ignore:line
var layOutDay = require('expose?layOutDay!./utils/lay-out-day');
var defaultEvents = require('./utils/default-events');
var React = require('react');
var Calendar = require('./Calendar');
// bootstrap the events and expose the function globally through webpack
layOutDay(defaultEvents);

React.render(<Calendar />, document.querySelector('.calendar'));
