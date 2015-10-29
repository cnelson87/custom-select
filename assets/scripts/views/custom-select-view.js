
var CustomSelectView = Backbone.View.extend({

	tagName: 'div',
	className: 'custom-select-container',
	attributes: {'tabindex':'-1'},

	events: {
		'focusin': '__onActive',
		'focusout': '__onInactive',
		// 'mouseenter': '__onActive',
		// 'mouseleave': '__onInactive',
		'click a': '__onClick'
	},


/**
*	Private Methods
**/

	initialize: function(objOptions) {
		this.$select = objOptions.select;
		this.$options = this.$select.children('option');
		this.$parent = this.$select.parent();
		this.$links = null;
		this.$current = null;
		this.$label = null;

		this.template = $('#tmpCustomSelect').html();

		this._buildData();

		this._bindEvents();

		this.render();

		this.$links = this.$el.find('a');
		this.$current = $(this.$links[0]);
		this.$label = this.$el.find('.custom-select-label');

	},

	_buildData: function() {
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

	_bindEvents: function() {
		var self = this;

		this.$select
			.on('change', function(e) {
				self.__onSelectChange(e);
			})
			.on('focus', function(e) {
				self.__onSelectFocus(e);
			});

	},


/**
*	Event Handlers
**/

	__onSelectChange: function(e) {
		//console.log('__onSelectChange');
		var index = this.getIndex();
		var val = this.getValue();
		var $current = $(this.$links[index]);
		if ($current[0] !== this.$current[0]) {
			$current.click();
		}
		$.event.trigger('CustomSelect:selectChanged', [val]);
		this.trigger('CustomSelect:selectChanged', val);
	},

	__onSelectFocus: function(e) {
		//console.log('__onSelectFocus');
		this.$el.focus();
	},

	__onActive: function(e) {
		//console.log('__onActive');
		this.$el.addClass('active');
	},

	__onInactive: function(e) {
		//console.log('__onInactive');
		this.$el.removeClass('active');
	},

	__onClick: function(e) {
		//console.log('__onClick');
		e.preventDefault();
		this.$current = $(e.target);
		this.updateUI();
		this.__onInactive();
	},


/**
*	Public API
**/

	updateUI: function() {
		var val = this.getValue();
		var rel = this.$current.attr('rel');
		var text = this.$current.text();

		this.$label.text(text);

		this.$links.removeClass('active');
		this.$current.addClass('active');

		if (rel !== val) {
			this.$select.val(rel);
			this.$select.change();
		}

	},

	getIndex: function() {
		return this.$select.prop('selectedIndex');
	},

	getLabel: function() {
		return this.$select.find('option:selected').text();
	},

	getValue: function() {
		return this.$select.val();
	},

	render: function() {
		var html = Mustache.to_html(this.template, this.obData);
		this.$el.html(html).appendTo(this.$parent);
		this.$select.addClass('replaced');
		return this.$el;
	}

});
