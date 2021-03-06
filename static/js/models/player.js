define(function (require) {

	// ----------------------------------------
	// DEPENDENCIES
	// ----------------------------------------

	var Backbone = require('backbone');


	// ----------------------------------------
	// EXPORTS
	// ----------------------------------------

	return Backbone.Model.extend({
		defaults: {
			name : "participant",
			notes: "",
			checked: false,
			selected: false,
			hadTurn: false,
			active: false
		},

		select: function () {
			this.collection.select(this);
			this.edit();
		},

		edit: function () {
			this.trigger('edit:player', this);
		},

		getIndex: function () {
			return this.collection.indexOf(this);
		}
	});

});