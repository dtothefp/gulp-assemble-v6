'use strict';
require('../scss/main'); // jshint ignore:line

var React = require('react'),
    App = require('./app');

React.render(<App />, document.querySelector('.container'));
