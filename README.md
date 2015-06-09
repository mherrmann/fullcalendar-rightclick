# fullcalendar-rightclick.js

This small file adds two new callbacks to FullCalendar:

    dayRightclick(date, jsEvent, view)
    eventRightclick(event, jsEvent, view)

To use the file, include it *after* `fullcalendar.js`:

    <script type="text/javascript" src="fullcalendar.js">
    <script type="text/javascript" src="fullcalendar-rightclick.js">

You can then define the callbacks in FullCalendar's options dictionary:

    $('#calendar').fullCalendar({
        dayRightclick: function(date, jsEvent, view) {
            alert('a day has been rightclicked!');
            // Prevent browser context menu:
            return false;
        },
        eventRightclick: function(event, jsEvent, view) {
        	alert('an event has been rightclicked!');
            // Prevent browser context menu:
            return false;
        }
    });

## Live example

https://jsfiddle.net/a17kuyL0/