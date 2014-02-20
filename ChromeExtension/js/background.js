/*global $, require, io*/

(function() {
    'use strict';

    require.config({
        baseUrl: '/js',
        packages: [{
            name: "jquery",
            location: "./libs",
            main: "jquery-1.10.1"
        },{
            name: "backbone",
            location: "./libs",
            main: "backbone-1.0"
        }, {
            name: "underscore",
            location: "./libs",
            main: "underscore-1.5.1"
        }, {
            name: "localstorage",
            location: "./libs",
            main: "backbone.localstorage-1.1.7"
        }],
        shim: {
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'underscore': {
                exports: '_'
            }
        }
    });

    require(['collections/projects', 'modules/timer'], function(Projects, Timer) {

        window.App = {
            Collections: {
                Projects: new Projects()
            }
        };

        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.msg == "activeChanged"){
                App.Collections.Projects = new Projects();
                Timer.changed();

                sendResponse({
                    msg: "change timer"
                });
            }
        });
        Timer.changed();

    });

}());