
/**
*	WORK IN PROGRESS
**/

var CustomSelect = Backbone.View.extend({

	template: null,

	events: {
		'focusin': '__onActive',
		'focusout': '__onInactive',
		'mouseenter': '__onActive',
		'mouseleave': '__onInactive',
		'change select': '__onSelectChange',
		'focus select': '__onSelectFocus',
		'click a': '__onClick'
	},

	initialize: function () {


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
		this.updateUI();
		this.__onInactive();
	},


/**
*	Public Methods
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
		this.$el.html(html);
		return this.$el;
	}

});
