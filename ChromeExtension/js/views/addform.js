(function() {
	'use strict';
	define(['backbone', 'models/project', 'views/projecttablerow'], function(Backbone, Project, ProjectTableRow) {

		return Backbone.View.extend({
			el: $('[context="AddForm"]'),

			initialize: function() {
				console.log('Add Form View Initialized');
				this.$form = this.$('[context="Form"]');
				this.$inputprojectname = this.$('#projectName');
				this.$addprojectbtn = this.$('[action="ShowForm"]');
			},

			events: {
				'click [action="ShowForm"]': 'showForm',
				'click [action="AddProject"]': 'addProject',
				'click [action="CancelAdd"]': 'hideForm',
				'keydown #projectName': 'captureKey'
			},

			showForm: function() {
				this.$form.removeClass('hidden');
				this.$addprojectbtn.addClass('hidden');
				this.$inputprojectname.focus();
				this.$form.show();
			},

			hideForm: function() {
				this.$form.addClass('hidden');
				this.$addprojectbtn.removeClass('hidden');
			},

			addProject: function(){
				if(this.$inputprojectname.val() === ''){
					this.hideForm();
					return false;
				}

				var project = new Project({
					projectname: this.$inputprojectname.val()
				});

				

				App.Views.ProjectTable.$el.append(new ProjectTableRow({
					model : project
				}).render().el);

				App.Collections.Projects.push(project);

				this.$inputprojectname.val('');
				this.hideForm();
			},

			captureKey: function(e){
				if(e.keyCode == 13){
					this.addProject();
				}
			}

		});

	});
})();