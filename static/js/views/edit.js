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
		className: "edit-pane",
		template: _.template( $("#edit-pane-template").html()),

		events:	{
			'click .save-edit'	: 'saveNotes'
		},

		initialize:	function () {
			this.listenTo(this.model, "change:selected", this.cleanup);
			this.listenTo(this.model, "destroy", this.remove);
		},

		cleanup: function (model, isSelected) {
			if (! isSelected) {
				this.remove();
			}
		},

		render:	function () {
			var playerData = this.model.toJSON();
			this.$el.html(this.template(playerData));
			return this;
		},

		saveNotes: function () {
			var value =	this.$el.find(".player-notes").val();
			this.model.set('notes', value);
		}
	});

});
