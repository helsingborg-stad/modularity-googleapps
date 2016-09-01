var ModularityGoogleApps = {};

function modularityGoogleApps() {
    ModularityGoogleApps.Module.Calendar.init();
}

ModularityGoogleApps = ModularityGoogleApps || {};

ModularityGoogleApps.Auth = (function ($) {
    var _clientId = '1041367213696-326pvm5bjfvg6i15o40tvfb6shk14p41.apps.googleusercontent.com';
    var _scopes = [
        "https://www.googleapis.com/auth/calendar.readonly"
    ];

    /**
     * Constructor
     * Should be named as the class itself
     */
    function Auth() {
        this.handleEvents();
    }

    /**
     * Handle events
     * @return {void}
     */
    Auth.prototype.handleEvents = function() {
        $(document).on('click', '[data-action="google-auth"]', function (e) {
            e.preventDefault();
            this.showAuthDialog();
        }.bind(this));
    };

    /**
     * Check user authorization
     * @return {void}
     */
    Auth.prototype.checkAuth = function (callbackFn) {
        gapi.auth.authorize({
            client_id: _clientId,
            scope: _scopes.join(' '),
            immediate: true
        }, callbackFn);
    };

    /**
     * Handle auth response
     * @param  {object} response Auth response
     * @return {void}
     */
    Auth.prototype.defaultHandleAuthResponse = function(authResult) {
        // Access granted
        if (authResult && !authResult.error) {
            console.log("Access granted");
            return true;
        }

        // Access denied
        console.log("Access denied");
        return false;
    };

    /**
     * Display auth dialog
     * @return {void}
     */
    Auth.prototype.showAuthDialog = function() {
        gapi.auth.authorize({
            client_id: _clientId,
            scope: _scopes,
            immediate: false
        }, this.handleAuthResult);

        return false;
    };

    return new Auth();

}(jQuery));
