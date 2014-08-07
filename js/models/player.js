


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