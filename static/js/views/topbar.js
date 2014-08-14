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

		initialize: function(){
			this.listenTo(this.collection, "destroy", this.resetButton);
		},

		render:	function () {
			this.$el.html(this.template());
			this.turnBtn = this.$el.find('.turn-button');
			this.turnBtn.html('Start Turns');
			this.turnBtn.toggleClass('start-turn');
			return this;
		},

		firstTurn: function () {
			if (this.collection.length){
				this.collection.advanceTurn();
				this.turnBtn.html('Next Turn');
				this.turnBtn.toggleClass('start-turn next-turn');
			}
		},

		advanceTurn: function () {
			this.collection.advanceTurn();

		},

		resetButton: function(){
			if (!this.collection.length){
				this.turnBtn.html('Start Turns');
				this.turnBtn.toggleClass('start-turn', true);
				this.turnBtn.toggleClass('next-turn', false);
			}
		}


	});

});