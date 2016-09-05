ModularityGoogleApps = ModularityGoogleApps || {};

ModularityGoogleApps.clientId = ModularityGoogleCalendarLang.clientId;
ModularityGoogleApps.scopes = [
    "https://www.googleapis.com/auth/calendar.readonly"
];

ModularityGoogleApps.Auth = (function ($) {
    /**
     * Constructor
     * Should be named as the class itself
     */
    function Auth() {
        if (!ModularityGoogleApps.clientId) {
            console.error('No Google API Client ID given in the Modularity settings.');
            return;
        }

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
            client_id: ModularityGoogleApps.clientId,
            scope: ModularityGoogleApps.scopes.join(' '),
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
            location.reload();
            return true;
        }

        // Access denied
        return false;
    };

    /**
     * Display auth dialog
     * @return {void}
     */
    Auth.prototype.showAuthDialog = function() {
        gapi.auth.authorize({
            client_id: ModularityGoogleApps.clientId,
            scope: ModularityGoogleApps.scopes,
            immediate: false
        }, this.defaultHandleAuthResponse);

        return false;
    };

    return new Auth();

}(jQuery));
