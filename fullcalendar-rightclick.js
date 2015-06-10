/*!
 * fullcalendar-rightclick v1.0
 * Docs & License: https://github.com/mherrmann/fullcalendar-rightclick
 * (c) 2015 Michael Herrmann
 */

(function($) {
	var fc = $.fullCalendar;
	var AgendaView = fc.views.agenda;
	var originalRender = AgendaView.prototype.render;
	AgendaView.prototype.render = function() {
		originalRender.call(this);
		this.registerDayRightclickListener();
		this.registerEventRightclickListener();
	};
	AgendaView.prototype.registerDayRightclickListener = function() {
		var that = this;
		this.el.on('contextmenu', '.fc-widget-content .fc-slats',
			function(ev) {
				that.coordMap.build();
				var cell = that.coordMap.getCell(ev.pageX, ev.pageY);
				if (cell)
					return that.trigger('dayRightclick', null, cell.start, ev);
			}
		);
	};
	AgendaView.prototype.registerEventRightclickListener = function() {
		var that = this;
		this.el.on('contextmenu', '.fc-event-container > *', function(ev) {
			var seg = $(this).data('fc-seg');
			return that.trigger('eventRightclick', this, seg.event, ev);
		});
	}
})(jQuery);