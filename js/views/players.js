

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