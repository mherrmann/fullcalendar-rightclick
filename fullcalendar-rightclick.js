/*!
 * fullcalendar-rightclick v1.4
 * Docs & License: https://github.com/mherrmann/fullcalendar-rightclick
 * (c) 2015 Michael Herrmann
 */

(function($) {
	function monkeyPatchViewClass(View) {
		View = View.class || View;
		var renderFn = 'render' in View.prototype ? 'render' : 'renderDates';
		var originalRender = View.prototype[renderFn];
		View.prototype[renderFn] = function() {
			originalRender.call(this);
			if (! this.el.data('fullcalendar-rightclick')) {
				this.registerRightclickListener();
				this.el.data('fullcalendar-rightclick', true)
			}
		};
		View.prototype.registerRightclickListener = function() {
			var that = this;
			this.el.on('contextmenu', function(ev) {
				var eventElt = $(ev.target).closest('.fc-event');
				if (eventElt.length) {
					var seg = eventElt.data('fc-seg');
					return that.trigger('eventRightclick', this, seg.event, ev);
				} else {
					that.coordMap.build();
					var cell = that.coordMap.getCell(ev.pageX, ev.pageY);
					if (cell)
						return that.trigger(
							'dayRightclick', null, cell.start, ev
						);
				}
			});
		}
	}
	var fc = $.fullCalendar;
	monkeyPatchViewClass(fc.views.agenda);
	monkeyPatchViewClass(fc.views.basic);
})(jQuery);