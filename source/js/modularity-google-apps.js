var ModularityGoogleApps = {};

function modularityGoogleApps() {
    if (typeof ModularityGoogleApps.Module == 'undefined') {
        return;
    }

    // Init module: Calendar
    if (typeof ModularityGoogleApps.Module.Calendar != 'undefined') {
        ModularityGoogleApps.Module.Calendar.init();
    }
}
