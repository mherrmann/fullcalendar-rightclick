/*!
 * fullcalendar-rightclick v1.2
 * Docs & License: https://github.com/mherrmann/fullcalendar-rightclick
 * (c) 2015 Michael Herrmann
 */

(function($) {
	function monkeyPatchViewClass(View, dayCssClass) {
		var originalRender = View.prototype.render;
		View.prototype.render = function() {
			originalRender.call(this);
			this.registerDayRightclickListener();
			this.registerEventRightclickListener();
		};
		View.prototype.registerDayRightclickListener = function() {
			var that = this;
			this.el.on('contextmenu', '.fc-widget-content ' + dayCssClass,
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
	monkeyPatchViewClass(fc.views.agenda, '.fc-slats');
	monkeyPatchViewClass(fc.views.basic, '.fc-content-skeleton');
})(jQuery);