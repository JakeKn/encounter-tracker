


var PlayerModel = Backbone.Model.extend({
	defaults: {
		name		: 	"participant",
		notes		: 	"",
		checked		:	false,
		selected	:	false
		},
	select	:	function(){
		this.collection.select(this);
	}
});

var Players = Backbone.Collection.extend({
	model: PlayerModel,
	removeChecked	:	function(){
		var deadMen	= this.where({"checked" : true});
		deadMen.forEach(function(model){ 
			if (model.get("checked")){
				model.destroy();
			}
		});
	},
	hasChecked	:	function(){
		return this.some(function (model) { return model.get('checked'); });
		
	},
	select		:	function(player){
		var selected	=	this.findWhere({"selected" : true});
		if (selected){
			selected.set("selected", false);
		}

		player.set("selected", true);
	}
});

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

		var topBar = new TopBarView().render();


		this.$el.find('.top-bar-container').append(topBar.el);
		this.$el.find('.players-container').append(playersView.el);

		// THESE ARE FOR DEBUGGING ONLY!
		this.players.add({ name: 'a', selected: true });
		this.players.add({ name: 'b' });

		return this;
	}
});

var	TopBarView	=	Backbone.View.extend({
	className	:	"top-bar",
	template	:	_.template($("#top-bar-template").html()),
	render:	function (){
		this.$el.html(this.template());
		return this;
	}

});

var PlayerView =	Backbone.View.extend({
	className	:	"player-item",
	template	:	_.template( $("#player-item-template").html()),
	initialize	:	function(){
		this.listenTo(this.model, "destroy", this.remove);
		this.listenTo(this.model, "change:selected", this.toggleSelected);
	},
	events		:	{
		"click .kill-box"	:	"toggleChecked",
		"click"				:	"select"
	},
	render		:	function(){
		var playerData	=	this.model.toJSON();
		this.$el.html(this.template(playerData));
		this.$el.toggleClass('selected', playerData.selected);
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
	select	:	function() {
		this.model.select();
		this.initializeEditView();
	},
	initializeEditView: function () {
		var editView = new EditView({model : this.model});
		editView.render();
		$(".edit-pane-container").append(editView.el);
	},
	toggleSelected	:	function(model, isSelected){
		this.$el.toggleClass('selected', isSelected);
	}
});

var PlayersView	=	Backbone.View.extend({
	className	:	"players-list",
	template	:	_.template($("#players-list-template").html()),
	events		:	{
		"click .add-player" 	:	"addNewPlayer",
		"input .player-input"	:	"toggleAddButton",
		"keyup .player-input"	:	"pressEnter",
		"click .kill-selected"	:	"removeChecked"
	},
	initialize	:	function(){
		this.listenTo(this.collection, "add", this.addPlayerView);
		this.listenTo(this.collection, "change:checked", this.killButtonToggle);
	},
	render:	function(){
		this.$el.html(this.template());

		this.addBtn	= this.$el.find(".add-player");
		this.killBtn = this.$el.find(".kill-selected");
		this.input = this.$el.find(".player-input");

		return this;
	},
	addPlayerView:	function(model){
		var childView	= new PlayerView({model : model});
		childView.render();
		this.$el.find(".players-list").append(childView.el);
	},
	addNewPlayer	:	function(){
		var value	=	this.input.val();
		this.input.val("");
		if (value !== ""){
			this.collection.add({name : value});
		}
		this.addBtn.attr("disabled", true);
	},
	toggleAddButton	:	function(){
		var value =  this.input.val();
		this.addBtn.attr("disabled", value.length === 0);
	},
	pressEnter	:	function(e){
		if (e.keyCode === 13){
			this.addNewPlayer();
		}
	},
	removeChecked	:	function(){
		this.collection.removeChecked();
		this.killBtn.attr("disabled", true);
	},
	killButtonToggle	:	function(){
		var checks = this.collection.hasChecked();
		this.killBtn.attr("disabled", !checks);
	}
});			

var EditView = Backbone.View.extend({
	className	:	"edit-pane",
	template	:	_.template( $("#edit-pane-template").html()),
	initialize	:	function(){
		this.listenTo(this.model, "change:selected", this.cleanup);
		this.listenTo(this.model, "destroy", this.remove);
	},
	events		:	{
		'click .save-edit'	: 'saveNotes'
	},
	cleanup: function (model, isSelected) {
		if (! isSelected) {
			this.remove();
		}
	},
	render		:	function(){
		var playerData	=	this.model.toJSON();
		this.$el.html(this.template(playerData));
		return this;
	},
	saveNotes	:	function(){
		var value =	this.$el.find(".player-notes").val();
		this.model.set('notes', value);
	}
});







var thisApp = new AppView({ el: $("#app") }).render();




