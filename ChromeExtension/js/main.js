/*global $, require, io*/


(function() {
    'use strict';

    var bodyID = document.querySelectorAll('body')[0].getAttribute('id');

    require.config({
        baseUrl: '/js',
        packages: [{
            name: "jquery",
            location: "./libs",
            main: "jquery-1.10.1"
        }, {
            name: "backbone",
            location: "./libs",
            main: "backbone-1.0"
        }, {
            name: "underscore",
            location: "./libs",
            main: "underscore-1.5.1"
        }, {
            name: "bootstrap",
            location: "./libs",
            main: "bootstrap-3.0.2/bootstrap"
        }, {
            name: "localstorage",
            location: "./libs",
            main: "backbone.localstorage-1.1.7"
        }, {
            name: "moment",
            location: "./libs",
            main: "moment-2.5.1"
        }],
        shim: {
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'underscore': {
                exports: '_'
            },
            'jquery.ui': {
                deps: ['jquery'],
            },
            'bootstrap': {
                deps: ['jquery'],
            }
        }
    });

    if (bodyID == 'BrowserAction') {
        require(['models/session', 'models/project', 'collections/projects', 'views/addform',
                'views/projecttable', 'views/viewcontroller'
            ],
            function(Session, Project, Projects, AddForm, ProjectTable, ViewController) {

                window.App = {
                    Models: {
                        Session: new Session(),
                    },
                    Collections: {
                        Projects: new Projects()
                    },
                    Views: {
                        AddForm: new AddForm(),
                        ViewController: new ViewController({
                            model: new Project()
                        })
                    }
                };

                App.Views.ProjectTable = new ProjectTable({
                    collection: App.Collections.Projects
                });

            });
    } else if (bodyID == 'BackgroundPage') {
        // require(['collections/projects', 'modules/timer'], function(Projects, Timer) {

        //     window.App = {
        //         Collections: {
        //             Projects: new Projects()
        //         }
        //     };

        //     chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        //         console.log(request.msg);
        //         if (request.msg == "activeChanged") {
        //             App.Collections.Projects = new Projects();
        //             Timer.changed();

        //             sendResponse({
        //                 msg: "change timer"
        //             });
        //         }
        //     });
        //     Timer.changed();

        // });
    }



}());