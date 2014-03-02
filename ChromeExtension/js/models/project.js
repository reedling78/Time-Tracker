(function() {
    'use strict';
    define(['backbone', 'modules/Timer'], function(Backbone, Timer) {

        return Backbone.Model.extend({
            initialize: function() {
                console.log('Project Model Initialized');
            },

            defaults: {
                projectname: 'Select Project To Time',
                startTime: 'off',
                time: {
                    s: 0,
                    m: 0,
                    h: 0
                },
                
            },

            setTotalTime:function(){
                this.set('totalTime', this.getTotalTime());
                this.set('startTime', 'off');
            },

            getTotalTime: function(){
                var startObj = (this.get('startTime') !== 'off') ? Timer.elapse(this.get('startTime'), new Date()) : Timer.elapse();
                var totalObj = this.get('totalTime') || Timer.elapse();
                var total = Timer.elapse();

                total.d = startObj.d + totalObj.d;
                total.h = startObj.h + totalObj.h;
                total.m = startObj.m + totalObj.m;
                total.s = startObj.s + totalObj.s;

                if(total.s > 59){
                    total.s = total.s - 60;
                    total.m = total.m + 1;
                }

                if(total.m > 59){
                    total.m = total.m - 60;
                    total.h = total.h + 1;
                }

                if(total.h > 23){
                    total.h = total.h - 24;
                    total.d = total.d + 1;
                }

                return total;
            },

            getTotalTimeFormated: function(){
                var time = this.getTotalTime();
                var s = time.s,
                    m = time.m,
                    h = time.h;

                if(h <= 9){
                    h = '0' + h;
                }

                if(m <= 9){
                    m = '0' + m;
                }

                if(s <= 9){
                    s = '0' + s;
                }
                return h + ':' + m + ':' + s;
            }

        });

    });
})();