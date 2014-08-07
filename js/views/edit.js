

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
