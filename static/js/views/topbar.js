define(function (require) {

	// ----------------------------------------
	// DEPENDENCIES
	// ----------------------------------------

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Template = require('text!templates/topbar.html');


	// ----------------------------------------
	// EXPORTS
	// ----------------------------------------

	return Backbone.View.extend({
		className: "top-bar",
		template: _.template(Template),

		events:	{
			"click .start-turn": "firstTurn",
			"click .next-turn": "advanceTurn"
		},

		render:	function () {
			this.$el.html(this.template());
			this.turnBtn = this.$el.find('.turn-button');
			this.turnBtn.html('Start Turns');
			this.turnBtn.toggleClass('start-turn');
			return this;
		},

		firstTurn: function () {
			this.collection.firstTurn();
			this.turnBtn.html('Next Turn');
			this.turnBtn.toggleClass('start-turn next-turn');
			console.log('active: '+ this.collection.findWhere({active: true}).get('name'));
		},

		advanceTurn: function () {
			this.collection.advanceTurn();
		}

	});

});