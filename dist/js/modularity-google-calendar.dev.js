var ModularityGoogleApps = ModularityGoogleApps || {};
ModularityGoogleApps.Module = ModularityGoogleApps.Module || {};

ModularityGoogleApps.Module.Calendar = (function ($) {

    var _gapi = null;
    var _clientId = '1041367213696-326pvm5bjfvg6i15o40tvfb6shk14p41.apps.googleusercontent.com';
    var _scopes = [
        "https://www.googleapis.com/auth/calendar.readonly"
    ];


    /**
     * Constructor
     * Should be named as the class itself
     */
    function Calendar() {
        this.handleEvents();
    }

    Calendar.prototype.handleEvents = function() {
        $(document).on('click', '.modularity-mod-g-calendar', function (e) {
            e.preventDefault();
            this.auth();
        }.bind(this));
    };

    Calendar.prototype.init = function() {
        this.checkAuth();
    };

    /**
     * Check user authorization
     * @return {void}
     */
    Calendar.prototype.checkAuth = function () {
        gapi.auth.authorize({
            client_id: _clientId,
            scope: _scopes.join(' '),
            immediate: true
        }, this.handleAuthResponse);
    };

    /**
     * Handle auth response
     * @param  {object} response Auth response
     * @return {void}
     */
    Calendar.prototype.handleAuthResponse = function(authResult) {
        // Access granted
        if (authResult && !authResult.error) {
            console.log("Access granted");
            return;
        }

        // Access denied
        ModularityGoogleApps.Module.Calendar.showAuthButtons();

        return;
    };

    Calendar.prototype.auth = function() {
        gapi.auth.authorize({
            client_id: _clientId,
            scope: _scopes,
            immediate: false
        }, this.handleAuthResult);

        return false;
    };

    Calendar.prototype.showAuthButtons = function() {
        $('.modularity-mod-g-calendar .box-content').append('<div class="gutter text-center"><div class="gutter gutter-bottom"><strong>Privat kalender.</strong> Du måste logga in med ditt Google-konto för att se kalendern.</div><button data-action="google-auth">Logga in</button></div>');
    };

    return new Calendar();

}(jQuery));

function modularityGoogleCalendar() {
    ModularityGoogleApps.Module.Calendar.init();
}
