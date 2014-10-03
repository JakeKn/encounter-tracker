
requirejs.config({
	paths: {
		jquery: 'libs/jquery-2.1.1',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		text: 'libs/text'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_'
		}
	}
});

require([
	'collections/players',
	'models/app', 
	'views/app',
	'views/topbar',
	'views/players'
], function (PlayersCollection, AppModel, AppView, TopBarView, PlayersView) {

	var playersCollection = new PlayersCollection();

	var appModel = new AppModel();
	
	var topBarView = new TopBarView({ 
		model: appModel,
		collection: playersCollection
	});

	var playersView = new PlayersView({
		collection: playersCollection
	});

	var appView = new AppView({
		el: $("#app"), 
	   	model: appModel,
	   	playersCollection: playersCollection,
	   	playersView: playersView,
	   	topBarView: topBarView
	});


	appView.render();

	playersCollection.add([
		{ name: 'a', selected: true },
		{ name: 'c' },
		{ name: 'b' },
		{ name: 'd' },
		{ name: 'e' },
		{ name: 'f' },
		{ name: 'g' },
		{ name: 'h' }
	]);


});