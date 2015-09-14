require.config({
  paths: {
    jquery: '../assets/js/lib/jquery',
    backbone: '../assets/js/lib/backbone',
    underscore: '../assets/js/lib/underscore',
    handlebars: '../assets/js/lib/handlebars',
    select2: '../assets/js/lib/select2.min'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    select2: {
        exports: 'Select2'
      }
  }
});

require(["init", "select2"]);