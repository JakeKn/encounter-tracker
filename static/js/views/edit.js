define(function (require) {

	// ----------------------------------------
	// DEPENDENCIES
	// ----------------------------------------

	var _ = require('underscore'),
		Backbone = require('backbone'),
		Template = require('text!templates/edit.html');


	// ----------------------------------------
	// EXPORTS
	// ----------------------------------------

	return Backbone.View.extend({
		className: "edit-pane",
		template: _.template(Template),

		events:	{
			'click .save-edit': 'saveNotes'
		},

		initialize:	function () {
			this.listenTo(this.model, "destroy", this.remove);
		},

		render:	function () {
			var data = this.model.toJSON();
			this.$el.html(this.template(data));
			return this;
		},

		saveNotes: function () {
			var value =	this.$el.find(".player-notes").val();
			this.model.set('notes', value);
		}
	});

});
