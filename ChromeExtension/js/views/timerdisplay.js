(function() {
	'use strict';
	define(['backbone'], function(Backbone) {
		return Backbone.View.extend({
			el: $('[context="TimerDisplay"]'),

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
				'click button[context="ToggleTimer"]': 'toggleTimer'
			},

			setHeader: function(){
				this.$header.text(this.model.get('projectname'));
			},

			setTimer: function(){
				this.$timer.text(this.model.get('time'));
			}

		});

	});
})();