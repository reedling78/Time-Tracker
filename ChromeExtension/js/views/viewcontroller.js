(function() {
	'use strict';
	define(['backbone'], function(Backbone) {
		return Backbone.View.extend({
			el: $('body'),

			initialize: function() {
				var thiz = this;
				this.$header = this.$('[context="ProjectTitle"]');
				this.$timer = this.$('[context="BigTimer"]');

				this.model.on('change:projectname', function(){
					thiz.setHeader();
				});

				this.model.on('change:time', function(){
					thiz.setTimer();
				});
			},

			events: {
				'click button[context="ToggleTimer"]': 'toggleTimer',
				'click a[action="OpenDataPage"]': 'openDataPage'
			},

			setHeader: function(){
				this.$header.text(this.model.get('projectname'));
			},

			setTimer: function(){
				this.$timer.text(this.model.get('time'));
			},

			openDataPage:function(){
				chrome.tabs.create({'url': chrome.extension.getURL('src/data_page/datapage.html')}, function(tab) {
					// Tab opened.
				});
				return false;
			}

		});

	});
})();