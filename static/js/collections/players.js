
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
				//if (model.get("checked")){
					model.destroy();
				//}
			});
			var alive = this.findWhere({'active' : true});
			var next = this.findWhere({'hadTurn' : true});
			if (!alive){
				console.log('active guy died');
				

					//
					//This is what is weird and needs to be fixed
					//
				next.set('active', true);
				console.log('setting ' + next.get('name'));
			}
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

			// Console Logs to show who whow the currently active player is
			// and how many turns have ended this round
			
			console.log('active guy: ' + active.get('name'));
			console.log('Turns ended this round: ' + hadTurn.length);
		}
	});

});
