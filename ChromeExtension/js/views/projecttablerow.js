(function() {
    'use strict';
    define(['backbone', 'modules/helpers'], function(Backbone, Helpers) {

        return Backbone.View.extend({
            tagName: 'tr',
            template: _.template($('#TableRow').html()),

            events: {
                'click [action="Stop"]': 'stopTimer',
                'click [action="Start"]': 'startTimer',
            },

            render: function () {
                var thiz = this;
                this.model.set('time', Helpers.formatTime(this.model));
                this.$el.html(this.template(this.model.toJSON()));

                this.$time = this.$('[context="Time"]');
                this.$startbtn = this.$('[action="Start"]');
                this.$stopbtn = this.$('[action="Stop"]');

                chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                    if (request.msg == "tick" && 
                        request.projectname == thiz.model.get('projectname')){
                        console.log(request);
                        thiz.$time.text(request.time);
                        App.Views.TimerDisplay.model.set('time', request.time);
                    }
                });

                if(this.model.get('isActive')){
                    this.$startbtn.addClass('hidden');
                    this.$stopbtn.removeClass('hidden');
                }

                this.on('stop', function(){
                    thiz.stopTimer();
                });

                return this;
            },

            stopTimer: function(e){
                this.$startbtn.toggleClass('hidden');
                this.$stopbtn.toggleClass('hidden');
                this.$el.removeClass('danger');

                this.model.set('isActive', false);
                App.Collections.Projects.trigger('add');

                chrome.runtime.sendMessage({msg: "activeChanged"});
            },

            startTimer: function(){
                
                this.$startbtn.toggleClass('hidden');
                this.$stopbtn.toggleClass('hidden');
                this.$el.addClass('danger');

                this.model.set('isActive', true);

                //clear last project being timed
                if(App.Models.Session.get('activeRow') !== undefined){
                    var currentlyRunning = App.Models.Session.get('activeRow');
                    currentlyRunning.trigger('stop');
                }
                
                App.Models.Session.set('activeRow', this);
                App.Collections.Projects.trigger('add');

                chrome.runtime.sendMessage({
                    msg: "activeChanged"
                });

            },

            

        });

    });
})();