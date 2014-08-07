


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