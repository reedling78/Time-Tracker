/*global $, require, io*/
    

(function() {
    'use strict';

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

    require(['models/session', 'models/project', 'collections/projects', 'views/addform', 
        'views/projecttable', 'views/timerdisplay'],
        function(Session, Project, Projects, AddForm, ProjectTable, TimerDisplay) {
        
        window.App = {
            Models: {
                Session: new Session(),
            },
            Collections: {
                Projects: new Projects()
            },
            Views: {
                AddForm: new AddForm(),
                TimerDisplay: new TimerDisplay({
                    model: new Project()
                })
            }
        };

        App.Views.ProjectTable = new ProjectTable({
            collection: App.Collections.Projects
        });
;

    });

}());