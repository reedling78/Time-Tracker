(function() {
    'use strict';
    define(['backbone', 'modules/helpers', 'modules/timer'], function(Backbone, Helpers, Timer) {

        return Backbone.View.extend({
            tagName: 'tr',
            template: _.template($('#TableRow').html()),

            events: {
                'click [action="Stop"]': 'stopTimer',
                'click [action="Start"]': 'startTimer',
            },

            render: function () {
                var thiz = this;
                this.model.set('time', this.model.getTotalTimeFormated());
                this.$el.html(this.template(this.model.toJSON()));

                this.$time = this.$('[context="Time"]');
                this.$startbtn = this.$('[action="Start"]');
                this.$stopbtn = this.$('[action="Stop"]');

                if(this.model.get('startTime') != 'off'){
                    this.$startbtn.addClass('hidden');
                    this.$stopbtn.removeClass('hidden');
                    App.Models.Session.set('activeRow', this);
                }

                this.on('stop', function(){
                    thiz.stopTimer();
                });

                return this;
            },

            stopTimer: function(e){
                clearInterval(this._timer);
                this.$startbtn.toggleClass('hidden');
                this.$stopbtn.toggleClass('hidden');
                this.$el.removeClass('danger');

                this.model.setTotalTime();
                App.Models.Session.unset('activeRow');
                App.Collections.Projects.trigger('add');
                
            },

            startTimer: function(){
                var thiz = this;
                this.$startbtn.toggleClass('hidden');
                this.$stopbtn.toggleClass('hidden');
                this.$el.addClass('danger');

                //clear last project being timed
                if(App.Models.Session.get('activeRow') !== undefined){
                    var currentlyRunning = App.Models.Session.get('activeRow');
                    currentlyRunning.trigger('stop');
                }

                this.model.set('startTime', new Date());
                App.Models.Session.set('activeRow', this);
                App.Collections.Projects.trigger('add');

                thiz._timer = setInterval(function() {
                    myTimer();
                }, 1000);

                function myTimer() {
                    thiz.$time.text(thiz.model.getTotalTimeFormated());
                }
            },

            

        });

    });
})();