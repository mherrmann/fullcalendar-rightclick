/*!
 * fullcalendar-rightclick v1.4
 * Docs & License: https://github.com/mherrmann/fullcalendar-rightclick
 * (c) 2015 Michael Herrmann
 */

(function($) {
	function monkeyPatchViewClass(View, dayCssClasses) {
		View = View.class || View;
		var renderFn = 'render' in View.prototype ? 'render' : 'renderDates';
		var originalRender = View.prototype[renderFn];
		View.prototype[renderFn] = function() {
			originalRender.call(this);
			if (! this.el.data('fullcalendar-rightclick')) {
				this.registerDayRightclickListener();
				this.registerEventRightclickListener();
				this.el.data('fullcalendar-rightclick', true)
			}
		};
		View.prototype.registerDayRightclickListener = function() {
			var that = this;
			var daySelectors = [];
			for (var i=0; i < dayCssClasses.length; i++)
				daySelectors.push('.fc-widget-content ' + dayCssClasses[i]);
			var daySelector = daySelectors.join(', ');
			this.el.on('contextmenu', daySelector,
				function(ev) {
					that.coordMap.build();
					var cell = that.coordMap.getCell(ev.pageX, ev.pageY);
					if (cell)
						return that.trigger(
							'dayRightclick', null, cell.start, ev
						);
				}
			);
		};
		View.prototype.registerEventRightclickListener = function() {
			var that = this;
			this.el.on('contextmenu', '.fc-event-container > *', function(ev) {
				var seg = $(this).data('fc-seg');
				return that.trigger('eventRightclick', this, seg.event, ev);
			});
		}
	}
	var fc = $.fullCalendar;
	monkeyPatchViewClass(fc.views.agenda, [
		'.fc-slats', '.fc-content-skeleton', '.fc-bg'
	]);
	monkeyPatchViewClass(fc.views.basic, ['.fc-content-skeleton', '.fc-bg']);
})(jQuery);