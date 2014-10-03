
define(function (require) {

	// ----------------------------------------
	// DEPENDENCIES
	// ----------------------------------------

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
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
			var data = this.model.toJSON();

			this.$el
				.html(this.template(data))
				.toggleClass('selected', data.selected)
				.toggleClass('active', data.active);

			if (data.selected) {
				this.model.edit();
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
 		},

		toggleSelected:	function (model, isSelected) {
			this.$el.toggleClass('selected', isSelected);
		},

		toggleActive: function (model, isActive) {
			this.$el.toggleClass('active', isActive);
		}
	});

});