(function() {
    'use strict';
    define(['backbone'], function(Backbone) {

        return Backbone.Model.extend({
            initialize: function() {
                console.log('Session Model Initialized');
                this.setEvents();
            },

            defaults: {
                'activeProject':  0
            },

            setEvents: function(){
                var thiz = this;
                this.on('change:activeProject', function(){
                    thiz.changeActive();
                });
            },

            changeActive: function(){
                var thiz = this;

                var newCurrent = App.Collections.Projects.get(App.Models.Session.get('activeProject'));

                var oldCurrent = App.Collections.Projects.where({
                    isTimeing: true
                });

                if(oldCurrent.length !== 0){
                    oldCurrent[0].set('isTimeing', false);
                }
                
                newCurrent.set('isTimeing', true);

                App.Views.ViewController.model = newCurrent;
                App.Views.ViewController.update(); // sad i can't listen for this model save
                App.projectTable.render();
            }

        });

    });
})();