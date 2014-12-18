/*
 *  jQuery Boilerplate - v3.3.2
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// Create the defaults once
		var pluginName = "accordion",
			defaults = {
				openSpeed: 800,
				closeSpeed: 500,
				toggleOpen: true, 
	            easing: 'easeOutQuad',
	            controlElement: '[data-control]',
	            contentElement: '[data-content]',
	            itemElement: '[data-item]',
	            openClass: 'open',
	            openFirstOnInit: false,
	            openCallBack: function(){}
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			this.$element = $(this.element);

			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;

			this.$items = this.$element.find(this.settings.itemElement);

			this.init();
		}

		Plugin.prototype = {
			init: function () {
				this.attachEvents();
				if (this.settings.openFirstOnInit) {
					this.openItem(this.$items.first());
				}
			},
			attachEvents: function() {
				this.$element.on('click', this.settings.controlElement, this.handleControl.bind(this));
			},
			handleControl: function(e) {
				var $item, $otherItems;

				$item = $(e.currentTarget).parent(this.settings.itemElement);
				$otherItems = this.$items.filter('.' + this.settings.openClass).not($item);

				// first close open items
				$otherItems.each(function(index, elem) {
					this.closeItem($(elem));
				}.bind(this));


				if (this.isOpen($item)) {
					if (this.settings.toggleOpen) this.closeItem($item);
				} else {
					this.openItem($item);
				}
			},
			isOpen: function($item) {
				return $item.hasClass(this.settings.openClass);
			},
			openItem: function($item) {
				$item.addClass(this.settings.openClass);
				$item.find(this.settings.contentElement).stop().slideDown(
					parseInt(this.settings.openSpeed),
					this.settings.easing,
					function() {
						if (typeof this.settings.openCallBack == 'function') this.settings.openCallBack.call(this, $item);
					}.bind(this)
				);
			},
			closeItem: function($item) {
				$item.removeClass(this.settings.openClass);
				$item.find(this.settings.contentElement).stop().slideUp(parseInt(this.settings.closeSpeed), this.settings.easing);
			}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
			this.each(function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
				}
			});
			return this;
		};

})( jQuery, window, document );