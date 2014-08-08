define(function (require) {

	// ----------------------------------------
	// DEPENDENCIES
	// ----------------------------------------

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone');


	// ----------------------------------------
	// EXPORTS
	// ----------------------------------------

	return Backbone.View.extend({
		className: "top-bar",
		template: _.template($("#top-bar-template").html()),

		events:	{
			"click .start-turn": "firstTurn",
			"click .next-turn": "advanceTurn"
		},

		render:	function () {
			this.$el.html(this.template());
			return this;
		},

		firstTurn: function () {
			this.collection.firstTurn();
		},

		advanceTurn: function () {
			this.collection.advanceTurn(this);
		}

	});

});