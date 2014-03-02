(function() {
    'use strict';
    define(['backbone', 'models/Project'], function(Backbone, Project) {
        return Backbone.Collection.extend({
            initialize: function(){
                var thiz = this;

                this.on('add', function(){
                    localStorage.setItem(
                        thiz.todaysDateString(),
                        JSON.stringify(thiz.toJSON())
                    );
                    console.log(thiz.toJSON());
                });

                //If a localstorage var has been created for today.
                if(localStorage.hasOwnProperty(thiz.todaysDateString())) {
                    var lsData = JSON.parse(localStorage.getItem(this.todaysDateString()));

                    for (var i = 0; i < lsData.length; i++) {
                        if(lsData[i].startTime !== 'off'){
                            lsData[i].startTime = new Date(lsData[i].startTime);
                        }
                        thiz.add(new Project(lsData[i]) ,{ silent: true });
                    }
                }


                this.trigger('add');

            },
            todaysDateString: function(){
                var d = new Date();
                return d.toLocaleDateString();
            }
        });
    });
})();






















