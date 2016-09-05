ModularityGoogleApps = ModularityGoogleApps || {};
ModularityGoogleApps.Module = ModularityGoogleApps.Module || {};

ModularityGoogleApps.Module.Calendar = (function ($) {
    /**
     * Constructor
     * Should be named as the class itself
     */
    function Calendar() {
    }

    /**
     * Initializes the Google Calendar module (login check)
     * @return {voud}
     */
    Calendar.prototype.init = function() {
        if (!ModularityGoogleAppsLang.clientId) {
            console.error('No Google API Client ID given in the Modularity settings.');
            return;
        }

        ModularityGoogleApps.Auth.checkAuth(function (authResult) {
            // Access granted, check calendar perminssions for all calendars on current page
            if (authResult && !authResult.error) {
                gapi.client.load('calendar', 'v3', function () {
                    ModularityGoogleApps.Module.Calendar.checkCalendarsPermissions();
                });
                return true;
            }

            // Access denied, show sign in button
            ModularityGoogleApps.Module.Calendar.showAuthButtons();
            return false;
        });
    };

    /**
     * Check permissions for all calendars on the page
     * @return {void}
     */
    Calendar.prototype.checkCalendarsPermissions = function() {
        $('.modularity-mod-g-calendar').each(function (index, element) {
            $element = $(element);
            var calendarId = $element.find('.box').data('calendar-id');
            this.checkPermission(calendarId, element);
        }.bind(this));
    };

    /**
     * Does the actual permission check
     * @param  {string} calendarId Calendar ID
     * @param  {object} element    Calendar module element
     * @return {void}
     */
    Calendar.prototype.checkPermission = function(calendarId, element) {
        var $element = $(element);

        var request = gapi.client.calendar.calendarList.get({
            calendarId: calendarId,
        });

        request.execute(function(response) {
            $element.find('.loading').remove();

            if (!response || response.error) {
                $element.find('.box-content').append('\
                    <div class="notice warning pricon pricon-notice-warning pricon-space-right">\
                        ' + ModularityGoogleAppsLang.calendar.permissionError + '\
                    </div>\
                ')
                return false;
            }

            ModularityGoogleApps.Module.Calendar.embed(element, response);
            return true;
        });
    };

    /**
     * Embeds Google Calendar
     * @param  {element} element  Containing element
     * @param  {object} calendar  Calenar object
     * @return {void}
     */
    Calendar.prototype.embed = function(element, calendar) {
        var $element = $(element);
        $element.find('.box-content').append('<iframe src="https://calendar.google.com/calendar/embed?src=' + calendar.id + '&ctz=' + calendar.timeZone + '" style="border: 0" width="100%" height="600" frameborder="0" scrolling="no"></iframe>');
    };

    /**
     * Show auth button if not logged in
     * @return {void}
     */
    Calendar.prototype.showAuthButtons = function() {
        $('.modularity-mod-g-calendar .loading').remove();
        $('.modularity-mod-g-calendar .box-content').append('\
            <div class="gutter text-center">\
                <div class="gutter gutter-bottom">\
                    ' + ModularityGoogleAppsLang.calendar.loginMessage + '\
                </div>\
                <button data-action="google-auth">' + ModularityGoogleAppsLang.calendar.login + '</button>\
            </div>\
        ');
    };

    return new Calendar();

}(jQuery));

function modularityGoogleCalendar() {
    ModularityGoogleApps.Module.Calendar.init();
}
