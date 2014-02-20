(function() {
    'use strict';
    define(['backbone', 'modules/helpers'], function(Backbone, Helpers, Projects, Project) {
        var timer;
        var currentProject;

        function start() {
            var project = currentProject;

            var s = project.get('s') || 0,
                m = project.get('m') || 0,
                h = project.get('h') || 0;

            timer = setInterval(function() {
                myTimer();
            }, 1000);

            function myTimer() {
                s++;

                if (s == 60) {
                    s = 0;
                    m++;
                }

                if (m == 60) {
                    m = 0;
                    h++;
                }

                project.set('s', s);
                project.set('m', m);
                project.set('h', h);

                chrome.browserAction.setBadgeText({
                    text: Helpers.badgeTime(project)
                });

                chrome.runtime.sendMessage({
                    msg: "tick",
                    projectname: project.get('projectname'),
                    time: Helpers.formatTime(project)
                });

                App.Collections.Projects.trigger('add');
            }
        }

        function changed() {
            var lsData;
            clearInterval(timer);

            //TODO this should be changed to a backbone where instead of a loop
            App.Collections.Projects.each(function(project){
                if(project.get('isActive')){
                    currentProject = project;
                    start();
                }
                
            });
        }

        return {
            changed: changed
        };


    });
})();