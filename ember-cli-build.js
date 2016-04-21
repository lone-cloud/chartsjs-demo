/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js');
  app.import('vendor/Chart.js');

  return app.toTree();
};
