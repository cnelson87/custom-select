
/**
*	WORK IN PROGRESS
**/

var CustomSelect = Backbone.View.extend({

	tagName: 'div',
	className: 'custom-select-container',
	attributes: {'tabindex':'-1'},

	events: {
		'focusin': '__onActive',
		'focusout': '__onInactive',
		'mouseenter': '__onActive',
		'mouseleave': '__onInactive',
		'change select': '__onSelectChange',
		'focus select': '__onSelectFocus',
		'click a': '__onClick'
	},


/**
*	Private Methods
**/

	initialize: function (objOptions) {
		this.$select = objOptions.select;
		this.$options = this.$select.children('option');
		this.$parent = this.$select.parent();
		this.$label = null;
		this.$links = null;
		this.$current = null;

		this.template = $('#tmpCustomSelect').html();

		this._buildData();

		this.render();

		this.$links = this.$el.find('a');
		this.$label = this.$el.find('.custom-select-label');

	},

	_buildData: function () {
		var self = this;
		var index = this.getIndex();
		var label = this.getLabel();
		var $opt;

		this.obData = {
			//index: index,
			label: label,
			items: []
		};

		for (var i=0, len = this.$options.length; i<len; i++) {
			$opt = $(this.$options[i]);
			this.obData.items[i] = {
				rel: $opt.attr('value'),
				text: $opt.text(),
				active: false
			}
		}
		this.obData.items[index].active = true;

	},

	_bindEvents: function () {
		var self = this;

		this.$select.on('change', function(e) {
			self.__onSelectChange(e);
		});

		this.$select.on('focus', function(e) {
			self.__onSelectFocus(e);
		});

		// this.$el.on('focusin', function(e) {
		// 	self.__onActive();
		// });

		// this.$el.on('focusout', function(e) {
		// 	self.__onInactive();
		// });

		// this.$el.on('mouseenter', function(e) {
		// 	self.__onActive();
		// });

		// this.$el.on('mouseleave', function(e) {
		// 	self.__onInactive();
		// });

		// this.$el.on('click', 'a', function(e) {
		// 	e.preventDefault();
		// 	self.$current = $(this);
		// 	self.__onClick(e);
		// });

	},


/**
*	Event Handlers
**/

	__onSelectChange: function (e) {
		var val = this.$select.val();
		$.event.trigger('CustomSelect:selectChanged', [val]);
		this.trigger('CustomSelect:selectChanged', val);
	},

	__onSelectFocus: function (e) {
		this.$el.focus();
	},

	__onActive: function (e) {
		this.$el.addClass('active');
	},

	__onInactive: function (e) {
		this.$el.removeClass('active');
	},

	__onClick: function (e) {
		e.preventDefault();
		this.$current = $(e.target);
		this.updateUI();
		this.__onInactive();
	},


/**
*	Public API
**/

	updateUI: function () {
		var val = this.$current.attr('rel');
		var text = this.$current.text();

		this.$label.text(text);

		this.$links.removeClass('active');
		this.$current.addClass('active');

		this.$select.val(val);
		this.$select.change();

	},

	getIndex: function () {
		return this.$select.prop('selectedIndex');
	},

	getLabel: function () {
		return this.$select.find('option:selected').text();
	},

	render: function () {
		var html = Mustache.to_html(this.template, this.obData);
		this.$el.html(html).appendTo(this.$parent);
		this.$select.addClass('replaced');
		return this.$el;
	}

});
