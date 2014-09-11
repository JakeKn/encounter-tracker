define(function (require) {

	// ----------------------------------------
	// DEPENDENCIES
	// ----------------------------------------

	var _ = require('underscore'),
		Backbone = require('backbone'),
		PlayerView = require('views/player'),
		Template = require('text!templates/players.html');


	// ----------------------------------------
	// EXPORTS
	// ----------------------------------------

	return Backbone.View.extend({
		className: "players",
		template: _.template(Template),

		events:	{
			"click .add-player": "addNewPlayer",
			"input .player-input": "toggleAddButton",
			"keyup .player-input": "pressEnter",
			"click .kill-selected": "removeChecked"
		},

		initialize:	function () {
			this.listenTo(this.collection, "add", this.addPlayerView);
			this.listenTo(this.collection, "change:checked", this.killButtonToggle);

            this.el.addEventListener('dragstart', this.handleDragStart.bind(this), false);
            this.el.addEventListener('dragover', this.handleDragOver.bind(this), false);
            this.el.addEventListener('drop', this.handleDrop.bind(this), false);
		},

		handleDragStart: function (event) {
			var modelId = event.target.dataset.cid;
			event.dataTransfer.setData('cid', modelId);
		},

		handleDragOver: function (event) {
			var playerEl = $(event.target).closest('.player-item');

            if (playerEl.hasClass('is-dropTarget')) {
                event.preventDefault();
            }
		},

		handleDrop: function (event) {
			var targetId = $(event.target).closest('.player-item').data('cid'),
                targetIndex = this.collection.get(targetId).getIndex(),
                sourceId = event.dataTransfer.getData('cid'),
                sourceModel = this.collection.get(sourceId);

			this.collection.remove(sourceModel);
			this.collection.add(sourceModel, { at: targetIndex }); 
 
            event.preventDefault();
		},

		render:	function () {
			this.$el.html(this.template());

			this.addBtn	= this.$el.find(".add-player");
			this.killBtn = this.$el.find(".kill-selected");
			this.input = this.$el.find(".player-input");

			return this;
		},

		addPlayerView:	function (model, collection, options) {
			var childView	= new PlayerView({model : model});
			childView.render();

			if (options.at !== undefined) {

				var previousEl = this.$el.find(".player-item").eq(options.at);
				childView.$el.insertBefore(previousEl);

			} else {
				this.$el.find(".players-list").append(childView.el);
			}
			
		},

		addNewPlayer: function () {
			var value = this.input.val();
			this.input.val("");
			if (value !== "") {
				this.collection.add({name : value});
			}
			this.addBtn.attr("disabled", true);
		},

		toggleAddButton: function () {
			var value = this.input.val();
			this.addBtn.attr("disabled", value.length === 0);
		},

		pressEnter: function (e) {
			if (e.keyCode === 13){
				this.addNewPlayer();
			}
		},

		removeChecked: function () {
			this.collection.removeChecked();
			this.killBtn.attr("disabled", true);
		},

		killButtonToggle: function () {
			var checks = this.collection.hasChecked();
			this.killBtn.attr("disabled", !checks);
		}

	});

});			