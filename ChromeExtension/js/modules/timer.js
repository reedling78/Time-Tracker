(function() {
    'use strict';
    define(['backbone', 'modules/helpers', 'moment'], function(Backbone, Helpers, moment) {
        var timer;
        var currentProject;

        function elapse(time1, time2){
            var obj = {d: 0,h: 0,m: 0,s: 0};
            var past, future;
            time1 = moment(time1).startOf('second');
            time2 = moment(time2).startOf('second');

            if(!time1.isValid() || !time2.isValid()){
                return obj;
            }

            if(time1.isBefore(time2)){
                past = time2;
                future = time1;
            } else {
                past = time1;
                future = time2;
            }

            obj.d = past.diff(future, 'days');
            obj.h = past.diff(future, 'hours');
            obj.m = past.diff(future, 'minutes');
            obj.s = past.diff(future, 'seconds');

            var totalh = past.diff(future, 'hours');
            var totalm = past.diff(future, 'minutes');

            obj.h = (obj.h-(obj.d*24) != -1)?obj.h-(obj.d*24)  : 0;
            obj.m = obj.m-(totalh*60);
            obj.s = obj.s-(totalm*60);

            return obj;
        }

        return {
            elapse: elapse
        };

    });
})();