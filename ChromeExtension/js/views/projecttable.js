(function() {
	'use strict';
	define(['backbone', 'views/projecttablerow'], function(Backbone, ProjectTableRow) {

		return Backbone.View.extend({
			el: $('[context="projecttable"]'),

			initialize: function() {
				this.render();
			},

			render: function(){
				var thiz = this;

				this.collection.each(function(model){
					var _current = new ProjectTableRow({
						model : model
					});
					thiz.$el.append(_current.render().el);
				});
			}

		});

	});
})();