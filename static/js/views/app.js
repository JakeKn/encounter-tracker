
define(function (require) {

	// ----------------------------------------
	// DEPENDENCIES
	// ----------------------------------------

	var _ = require('underscore'),
		Backbone = require('backbone'),
		Players = require('collections/players'),
		PlayersView = require('views/players'),
		TopBarView = require('views/topbar'),
		EditView = require('views/edit'),
		Template = require('text!templates/app.html');


	// ----------------------------------------
	// EXPORTS
	// ----------------------------------------

	return Backbone.View.extend({
		className: "app",
		template: _.template(Template),

		initialize: function () {
			this.players = new Players();

			this.listenTo(this.players, 'edit:player', this.createEditView);
		},

		createEditView: function (model) {
  			if (this.editView) {
  				this.editView.remove();
  			}

			this.editView = new EditView({ model: model }).render();
			this.$el.find(".edit-pane-container").append(this.editView.el);
		},

		render:	function () {
			this.$el.html(this.template());

			var playersView = new PlayersView({
				collection: this.players
			}).render();

			var topBar = new TopBarView({collection: this.players}).render();

			this.$el.find('.top-bar-container').append(topBar.el);
			this.$el.find('.players-container').append(playersView.el);

			// THESE ARE FOR DEBUGGING ONLY!
			this.players.add({ name: 'a', selected: true});
			this.players.add({ name: 'b' });
			this.players.add({ name: 'c' });
			this.players.add({ name: 'd' });
			this.players.add({ name: 'e' });
			this.players.add({ name: 'f' });
			this.players.add({ name: 'g' });
			this.players.add({ name: 'h' });

			return this;
		}
	});

});

