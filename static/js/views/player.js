
define(function (require) {

	// ----------------------------------------
	// DEPENDENCIES
	// ----------------------------------------

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		EditView = require('views/edit'),
		Template = require('text!templates/player.html');


	// ----------------------------------------
	// EXPORTS
	// ----------------------------------------

	return Backbone.View.extend({

		className: "player-item is-dropTarget",
		template: _.template(Template),

		events:	{
			"click .kill-box": "toggleChecked",
			"click": "select"
		},

		attributes: function () {
			return {
				"draggable": true,
				"data-cid": this.model.cid
			};
		},

		initialize:	function () {
			this.listenTo(this.model, "remove destroy", this.remove);
			this.listenTo(this.model, "change:selected", this.toggleSelected);
			this.listenTo(this.model, "change:active", this.toggleActive);
		},

		render:	function () {
			var playerData = this.model.toJSON();
			this.$el.html(this.template(playerData));
			this.$el.toggleClass('selected', playerData.selected);
			this.$el.toggleClass('active', playerData.active);
			if (playerData.selected) {
				this.initializeEditView();
			}
			return this;
		},

		toggleChecked:	function (event) {
			event.stopPropagation();
			var previous = this.model.get('checked');
			this.model.set('checked', !previous);
		},

		select:	function () {
			this.model.select();
			this.initializeEditView();
		},

		initializeEditView: function () {
			var editView = new EditView({model : this.model});
			editView.render();
			$(".edit-pane-container").append(editView.el);
		},

		toggleSelected:	function (model, isSelected) {
			this.$el.toggleClass('selected', isSelected);
		},

		toggleActive: function (model, isActive) {
			this.$el.toggleClass('active', isActive);
		}
	});

});