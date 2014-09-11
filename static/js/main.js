
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

require(["views/app"], function (AppView) {
	var thisApp = new AppView({ el: $("#app") }).render();
});