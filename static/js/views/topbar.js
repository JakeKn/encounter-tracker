define(function (require) {

	// ----------------------------------------
	// DEPENDENCIES
	// ----------------------------------------

	var _ = require('underscore'),
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
			return this;
		},

		firstTurn: function () {
			this.collection.firstTurn();
		},

		advanceTurn: function () {
			this.collection.advanceTurn();
		}

	});

});