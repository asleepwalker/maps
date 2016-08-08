define(['underscore', 'backbone', 'jquery', 'models/search', 'views/controls/search', 'views/controls/farm', 'views/controls/link', 'views/hint'], function(_, Backbone, $, SearchModel, SearchView, FarmView, LinkView, hintView) {
	'use strict';

	var $container = $('.controls');
	var $searchBtn = $('button.search', $container);
	var $farmBtn = $('button.farm', $container);
	var $editBtn = $('button.edit', $container);
	var $linkBtn = $('button.link', $container);

	var $navigatorBtn = $('.caption .controls button.navigator, button.open-navigator');
	var $navigatorOverlay = $('.navigator-overlay');

	return Backbone.View.extend({
		initialize: function(options) {
			this.app = options.app;

			$searchBtn.click(_.bind(this.openSearchDialog, this)).hint($searchBtn.data('title'));
			$farmBtn.click(_.bind(this.openFarmDialog, this)).hint($farmBtn.data('title'));
			$linkBtn.click(_.bind(this.openLinkDialog, this)).hint($linkBtn.data('title'));

			$navigatorBtn.click(_.bind(this.toggleNavigator, this));
			$navigatorOverlay.on('click mousedown touchdown', _.bind(this.closeNavigator, this));

			$editBtn.hint($editBtn.data('title'));
			this.listenTo(this.app, 'change:location', this.updateEditorLink);

			this.listenTo(this.app, 'change:location', this.turnControls);
		},

		turnControls: function() {
			var location = this.app.get('location');
			if (location.region == 'index') {
				$container.hide();
			} else {
				$container.show();
			}
		},

		openSearchDialog: function() {
			var searchModel = new SearchModel();
			var searchView = new SearchView({
				caption: $searchBtn.data('title'),
				model: searchModel
			});
		},

		openFarmDialog: function() {
			var farmView = new FarmView({
				caption: $farmBtn.data('title')
			});
		},

		openLinkDialog: function() {
			var linkView = new LinkView({
				caption: $linkBtn.data('title')
			});
		},

		toggleNavigator: function() {
			$('body').toggleClass('navigator');
		},

		closeNavigator: function() {
			$('body').removeClass('navigator');
		},

		updateEditorLink: function() {
			var location = this.app.get('location');
			$editBtn.attr('onclick', 'window.open("/editor/?map=' + location.region + '/' + location.level + '")');
		}	
	});

});
