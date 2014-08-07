


var AppView	=	Backbone.View.extend({
	className: "app",
	template: _.template($("#app-view-template").html()),

	initialize: function () {
		this.players = new Players();
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
		this.players.add({ name: 'a', selected: true, active: true});
		this.players.add({ name: 'b' });

		return this;
	}
});