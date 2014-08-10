
define(function (require) {

	// ----------------------------------------
	// DEPENDENCIES
	// ----------------------------------------

	var Backbone = require('backbone'),
		PlayerModel = require('models/player');


	// ----------------------------------------
	// EXPORTS
	// ----------------------------------------

	return Backbone.Collection.extend({
		model: PlayerModel,
		removeChecked:	function(){
			var deadMen	= this.where({"checked" : true});
			deadMen.forEach(function(model){ 
				if (model.get("checked")){
					model.destroy();
				}
			});
		},
		hasChecked:	function(){
			return this.some(function (model) { return model.get('checked'); });
			
		},
		select:	function(player){
			var selected	=	this.findWhere({"selected" : true});
			if (selected){
				selected.set("selected", false);
			}

			player.set("selected", true);
		},
		firstTurn:	function(view){
			
		},
		advanceTurn: function(){
			var active = this.findWhere({"active" : true});
			var turn = this.indexOf(active);
			var hadTurn = this.where({'hadTurn':true});
			this.at(turn).set('active', false);
			if (turn+1 >= this.length) {
				hadTurn.forEach(function(model){
					model.set('hadTurn', false);
				});
				this.at(0).set('active', true);
			}
			else{
				this.at(turn).set('hadTurn', true);
				this.at(turn+1).set('active', true);
			}
		}
	});

});
