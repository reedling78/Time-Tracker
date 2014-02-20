(function() {
    'use strict';
    define([], function() {

        return {

            formatTime: function(model){
                var s = model.get('s', s) || 0,
                    m = model.get('m', m) || 0,
                    h = model.get('h', h) || 0;

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

        };

    });
})();