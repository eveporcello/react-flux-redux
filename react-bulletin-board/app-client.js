var React = require('react');
var Board = require('./components/Board');
var $ = require('jquery');
window.$ = $;
window.jQuery = $;
require('bootstrap');


React.render(<Board count={100} />, document.getElementById('react-container'));