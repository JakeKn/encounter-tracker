
define(function (require) {

	// ----------------------------------------
	// DEPENDENCIES
	// ----------------------------------------

	var _ = require('underscore'),
		Backbone = require('backbone'),
		TopBarView = require('views/topbar'),
		EditView = require('views/edit'),
		Template = require('text!templates/app.html');


	// ----------------------------------------
	// EXPORTS
	// ----------------------------------------

	return Backbone.View.extend({
		className: "app",
		template: _.template(Template),

		initialize: function (params) {
			this.playersCollection = params.playersCollection;
			this.playersView = params.playersView;
			this.topBarView = params.topBarView;

			this.listenTo(this.playersCollection, 'edit:player', this.createEditView);
			this.listenTo(this.playersCollection, 'removed:players', this.activateNextAvailable);
		},

		createEditView: function (model) {
  			if (this.editView) {
  				this.editView.remove();
  			}

			this.editView = new EditView({ model: model }).render();
			this.$el.find(".edit-pane-container").append(this.editView.el);
		},

		activateNextAvailable: function () {
			if (this.model.isInPlay()) {
				this.playersCollection.activateNextAvailable();
			}
		},

		render:	function () {
			this.$el.html(this.template());

			this.playersView.render();
			this.topBarView.render();

			this.$el.find('.top-bar-container').append(this.topBarView.el);
			this.$el.find('.players-container').append(this.playersView.el);

			return this;
		}
	});

});

