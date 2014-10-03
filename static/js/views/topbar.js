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
			"click .turn-button": "handleClick"
		},

		initialize: function(){
			// this.listenTo(this.collection, "destroy", this.resetButton);
			this.listenTo(this.model, 'change:inPlay', this.updateButtonLabel);
		},

		render:	function () {
			this.$el.html(this.template());
			return this;
		},

		updateButtonLabel: function (model, inPlay) {
			var label = inPlay ? 'Next Turn' : 'Start Turns';
			this.$el.find('.turn-button').text(label);
		},

		handleClick: function () {
			if (this.model.isInPlay()) {
				this.advanceTurn();
			} else {
				this.firstTurn();
			}
		},

		firstTurn: function () {
			this.model.startPlay();

			if (this.collection.length) {
				this.collection.advanceTurn();
			}
		},

		advanceTurn: function () {
			this.collection.advanceTurn();
		},

		// resetButton: function () {
		// 	// TODO unfuck this
		// 	if (!this.collection.length){
		// 		this.turnBtn.html(startTurnLabel);
		// 	}
		// }


	});

});