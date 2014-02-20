(function() {
    'use strict';
    define(['backbone'], function(Backbone) {

        return Backbone.Model.extend({
            initialize: function() {
                console.log('Project Model Initialized');
            },

            defaults: {
                projectname: 'Select Project To Time',
                isActive: false,
                isTimeing: false,
                time: 0,
                s: 0,
                m: 0,
                h: 0
            }

        });

    });
})();