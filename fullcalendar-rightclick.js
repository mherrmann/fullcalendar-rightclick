/*!
 * fullcalendar-rightclick v1.0
 * Docs & License: https://github.com/mherrmann/fullcalendar-utils
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
				return that.triggerDayRightclick(ev);
			}
		);
	};
	AgendaView.prototype.triggerDayRightclick = function(ev) {
		this.coordMap.build();
		var cell = this.coordMap.getCell(ev.pageX, ev.pageY);
		return this.trigger('dayRightclick', null, cell.start, ev);
	};
	AgendaView.prototype.registerEventRightclickListener = function() {
		var that = this;
		this.el.on('contextmenu', '.fc-event-container > *', function(ev) {
			var seg = $(this).data('fc-seg');
			return that.trigger('eventRightclick', this, seg.event, ev);
		});
	}
})(jQuery);