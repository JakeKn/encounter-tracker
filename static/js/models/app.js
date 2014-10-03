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
			inPlay: false
		},

		isInPlay: function () {
			return this.get('inPlay');
		},

		startPlay: function () {
			this.set('inPlay', true);
		},

		stopPlay: function () {
			this.set('inPlay', false);
		}
	});

});