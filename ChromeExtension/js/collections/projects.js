(function() {
    'use strict';
    define(['backbone'], function(Backbone) {
        return Backbone.Collection.extend({
            initialize: function(){
                var thiz = this;

                this.on('add', function(){
                    localStorage.setItem(
                        thiz.todaysDateString(),
                        JSON.stringify(thiz.toJSON())
                    );
                });

                if(localStorage.hasOwnProperty(thiz.todaysDateString())) {
                    var lsData = JSON.parse(localStorage.getItem(this.todaysDateString()));

                    for (var i = 0; i < lsData.length; i++) {
                        thiz.add(lsData[i] ,{ silent: true });
                    }
                }

            },
            todaysDateString: function(){
                var d = new Date();
                return d.toLocaleDateString();
            }
        });
    });
})();






















